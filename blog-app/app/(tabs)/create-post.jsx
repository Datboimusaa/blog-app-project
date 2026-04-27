import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { usePosts } from "../../contexts/PostContext";

export default function CreatePostScreen() {
  const { addPost } = usePosts();

  const [title, setTitle]     = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Validation", "Both title and content are required.");
      return;
    }

    setLoading(true);
    try {
      await addPost(title.trim(), content.trim());
      setTitle("");
      setContent("");
      Alert.alert("Success", "Post created!", [
        { text: "Go to Feed", onPress: () => router.replace("/(tabs)/home") },
      ]);
    } catch (err) {
      Alert.alert(
        "Error",
        err.response?.data?.message || "Failed to create post. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View className="bg-white px-5 pt-14 pb-4 border-b border-gray-100">
          <Text className="text-2xl font-bold text-gray-900">New Post</Text>
          <Text className="text-sm text-gray-400">Share your thoughts</Text>
        </View>

        <View className="px-5 pt-6">
          {/* Title input */}
          <Text className="text-sm font-semibold text-gray-700 mb-1">Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter a catchy title..."
            placeholderTextColor="#9ca3af"
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base mb-5"
            maxLength={100}
          />

          {/* Content input */}
          <Text className="text-sm font-semibold text-gray-700 mb-1">Content</Text>
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Write your post here..."
            placeholderTextColor="#9ca3af"
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base"
            multiline
            numberOfLines={10}
            textAlignVertical="top"
            style={{ minHeight: 200 }}
          />

          {/* Character count */}
          <Text className="text-xs text-gray-300 text-right mt-1">
            {content.length} characters
          </Text>

          {/* Submit button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            className={`mt-6 rounded-xl py-4 items-center ${
              loading ? "bg-indigo-300" : "bg-indigo-500"
            }`}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-base">Publish Post</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}