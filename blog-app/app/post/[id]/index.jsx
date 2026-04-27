import { useEffect, useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../contexts/AuthContext";
import { usePosts } from "../../../contexts/PostContext";
import {
  getPostById, getComments, addComment, deleteComment, toggleLike,
} from "../../../services/api";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const { removePost, likePost } = usePosts();

  const [post, setPost]             = useState(null);
  const [comments, setComments]     = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Derived from local state so likes update instantly
  const isOwner   = user && post && user._id === post.author?._id;
  const hasLiked  = user && post?.likes?.some((l) => l === user._id || l?._id === user._id);
  const likeCount = post?.likes?.length ?? 0;

  useEffect(() => {
    loadPost();
    loadComments();
  }, [id]);

  const loadPost = async () => {
    try {
      const res = await getPostById(id);
      setPost(res.data);
    } catch {
      Alert.alert("Error", "Could not load post.");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const res = await getComments(id);
      setComments(res.data);
    } catch {
      // non-fatal
    }
  };

  const handleLike = async () => {
    try {
      const res = await toggleLike(id);
      const { likesCount, liked } = res.data;
      // Update local post likes optimistically
      setPost((prev) => {
        if (!prev) return prev;
        const newLikes = liked
          ? [...(prev.likes ?? []), user._id]
          : (prev.likes ?? []).filter((l) => l !== user._id && l?._id !== user._id);
        return { ...prev, likes: newLikes };
      });
      // Sync the feed list in context too
      likePost(id, user._id);
    } catch {
      Alert.alert("Error", "Could not like post.");
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      const res = await addComment(id, newComment.trim());
      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
    } catch (err) {
      Alert.alert("Error", err.response?.data?.message || "Could not add comment.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = (commentId) => {
    Alert.alert("Delete Comment", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive",
        onPress: async () => {
          try {
            await deleteComment(commentId);
            setComments((prev) => prev.filter((c) => c._id !== commentId));
          } catch {
            Alert.alert("Error", "Could not delete comment.");
          }
        },
      },
    ]);
  };

  const handleDeletePost = () => {
    Alert.alert("Delete Post", "This will permanently delete your post.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive",
        onPress: async () => {
          try {
            await removePost(id);
            router.replace("/(tabs)/home");
          } catch {
            Alert.alert("Error", "Could not delete post.");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (!post) return null;

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      {/* Header */}
      <View className="bg-white px-5 pt-14 pb-4 border-b border-gray-100 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="flex-1 text-lg font-bold text-gray-900" numberOfLines={1}>
          Post
        </Text>
        {isOwner && (
          <View className="flex-row gap-4">
            <TouchableOpacity onPress={() => router.push(`/post/${id}/edit`)}>
              <Ionicons name="create-outline" size={22} color="#6366f1" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeletePost}>
              <Ionicons name="trash-outline" size={22} color="#ef4444" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Post body */}
        <View className="bg-white rounded-2xl p-5 mb-4 border border-gray-100">
          <Text className="text-2xl font-bold text-gray-900 mb-2">{post.title}</Text>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm font-semibold text-indigo-600">
              {post.author?.name ?? "Unknown"}
            </Text>
            <Text className="text-xs text-gray-400">{formattedDate}</Text>
          </View>
          <Text className="text-base text-gray-700 leading-6">{post.content}</Text>

          {/* Like button */}
          <TouchableOpacity onPress={handleLike} className="flex-row items-center gap-2 mt-5">
            <Ionicons
              name={hasLiked ? "heart" : "heart-outline"}
              size={22}
              color={hasLiked ? "#ef4444" : "#9ca3af"}
            />
            <Text className={`text-sm font-medium ${hasLiked ? "text-red-400" : "text-gray-400"}`}>
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Comments */}
        <Text className="text-base font-bold text-gray-900 mb-3">
          Comments ({comments.length})
        </Text>

        {comments.length === 0 && (
          <Text className="text-sm text-gray-400 mb-4">No comments yet. Be the first!</Text>
        )}

        {comments.map((comment) => {
          const isCommentOwner = user && (user._id === comment.author?._id);
          return (
            <View key={comment._id} className="bg-white rounded-xl p-4 mb-3 border border-gray-100">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-sm font-semibold text-indigo-600">
                  {comment.author?.name ?? "Unknown"}
                </Text>
                <View className="flex-row items-center gap-2">
                  <Text className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      month: "short", day: "numeric",
                    })}
                  </Text>
                  {isCommentOwner && (
                    <TouchableOpacity onPress={() => handleDeleteComment(comment._id)}>
                      <Ionicons name="trash-outline" size={14} color="#ef4444" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <Text className="text-sm text-gray-700">{comment.content}</Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Comment input */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex-row items-center gap-3">
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Write a comment..."
          placeholderTextColor="#9ca3af"
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-900"
          multiline
        />
        <TouchableOpacity
          onPress={handleAddComment}
          disabled={submitting || !newComment.trim()}
          className={`rounded-full p-2 ${submitting || !newComment.trim() ? "bg-indigo-200" : "bg-indigo-500"}`}
        >
          {submitting
            ? <ActivityIndicator size="small" color="#fff" />
            : <Ionicons name="send" size={18} color="#fff" />
          }
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}