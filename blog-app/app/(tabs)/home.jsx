import { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { usePosts } from "../../contexts/PostContext";
import Post from "../../components/ui/Post";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { posts, loading, error, fetchPosts } = usePosts();

  // Load posts when screen mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-5 pt-14 pb-4 border-b border-gray-100 flex-row justify-between items-center">
        <View>
          <Text className="text-2xl font-bold text-gray-900">Blog Feed</Text>
          <Text className="text-sm text-gray-400">
            Hey, {user?.name ?? "there"} 👋
          </Text>
        </View>
        <TouchableOpacity
          onPress={logout}
          className="bg-gray-100 px-4 py-2 rounded-full"
        >
          <Text className="text-sm text-gray-600 font-medium">Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Error state */}
      {error && (
        <View className="mx-5 mt-4 bg-red-50 p-3 rounded-xl">
          <Text className="text-red-500 text-sm">{error}</Text>
        </View>
      )}

      {/* Posts list */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Post post={item} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchPosts}
            tintColor="#6366f1"
          />
        }
        ListEmptyComponent={
          !loading && (
            <View className="items-center mt-20">
              <Text className="text-gray-400 text-base">No posts yet.</Text>
              <Text className="text-gray-300 text-sm mt-1">
                Be the first to create one!
              </Text>
            </View>
          )
        }
        ListHeaderComponent={
          loading && posts.length === 0 ? (
            <ActivityIndicator
              size="large"
              color="#6366f1"
              className="mt-10"
            />
          ) : null
        }
      />
    </View>
  );
}