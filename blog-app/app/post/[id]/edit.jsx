import { useEffect, useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, Alert, KeyboardAvoidingView,
  Platform, ScrollView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { usePosts } from "../../../contexts/PostContext";
import { getPostById } from "../../../services/api";

export default function EditPostScreen() {
  const { id } = useLocalSearchParams();
  const { editPost } = usePosts();

  const [title, setTitle]     = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await getPostById(id);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch {
        Alert.alert("Error", "Could not load post.");
        router.back();
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [id]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Validation", "Title and content are required.");
      return;
    }
    setSaving(true);
    try {
      await editPost(id, title.trim(), content.trim());
      Alert.alert("Saved!", "Your post has been updated.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (err) {
      Alert.alert("Error", err.response?.data?.message || "Could not update post.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      {/* Header */}
      <View className="bg-white px-5 pt-14 pb-4 border-b border-gray-100 flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 flex-1">Edit Post</Text>
        <TouchableOpacity
          onPress={handleSave}
          disabled={saving}
          className={`px-4 py-2 rounded-full ${saving ? "bg-indigo-300" : "bg-indigo-500"}`}
        >
          {saving
            ? <ActivityIndicator size="small" color="#fff" />
            : <Text className="text-white font-semibold text-sm">Save</Text>
          }
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
        <Text className="text-sm font-semibold text-gray-700 mb-1">Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Post title..."
          placeholderTextColor="#9ca3af"
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base mb-5"
          maxLength={100}
        />

        <Text className="text-sm font-semibold text-gray-700 mb-1">Content</Text>
        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="Post content..."
          placeholderTextColor="#9ca3af"
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base"
          multiline
          textAlignVertical="top"
          style={{ minHeight: 240 }}
        />
        <Text className="text-xs text-gray-300 text-right mt-1">{content.length} characters</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}