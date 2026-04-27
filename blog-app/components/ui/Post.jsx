import { View, Text, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import { usePosts } from "../../contexts/PostContext";

export default function Post({ post }) {
  const { user } = useAuth();
  const { removePost, likePost } = usePosts();

  const isOwner   = user && (user._id === post.author?._id || user._id === post.author);
  const hasLiked  = user && post.likes?.some((l) => l === user._id || l?._id === user._id);
  const likeCount = post.likes?.length ?? 0;

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric",
      })
    : "";

  const handleDelete = () => {
    Alert.alert("Delete Post", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive",
        onPress: async () => {
          try { await removePost(post._id); }
          catch { Alert.alert("Error", "Could not delete post."); }
        },
      },
    ]);
  };

  const handleLike = async () => {
    try { await likePost(post._id, user._id); }
    catch { Alert.alert("Error", "Could not like post."); }
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`/post/${post._id}`)}
      activeOpacity={0.85}
      className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100"
    >
      {/* Author + date */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-sm font-semibold text-indigo-600">
          {post.author?.name ?? "Unknown"}
        </Text>
        <Text className="text-xs text-gray-400">{formattedDate}</Text>
      </View>

      {/* Title */}
      <Text className="text-lg font-bold text-gray-900 mb-1">{post.title}</Text>

      {/* Content preview */}
      <Text className="text-sm text-gray-600 leading-5 mb-3" numberOfLines={3}>
        {post.content}
      </Text>

      {/* Footer: like + owner actions */}
      <View className="flex-row items-center justify-between">
        <TouchableOpacity onPress={handleLike} className="flex-row items-center gap-1">
          <Ionicons
            name={hasLiked ? "heart" : "heart-outline"}
            size={18}
            color={hasLiked ? "#ef4444" : "#9ca3af"}
          />
          <Text className={`text-sm ${hasLiked ? "text-red-400" : "text-gray-400"}`}>
            {likeCount}
          </Text>
        </TouchableOpacity>

        {isOwner && (
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => router.push(`/post/${post._id}/edit`)}
              className="bg-indigo-50 px-3 py-1 rounded-full"
            >
              <Text className="text-xs text-indigo-500 font-medium">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              className="bg-red-50 px-3 py-1 rounded-full"
            >
              <Text className="text-xs text-red-500 font-medium">Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}