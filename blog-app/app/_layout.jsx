import { useEffect } from "react";
import { Stack, router } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { PostProvider } from "../contexts/PostContext";
import "../global.css";

function RootLayoutNav() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (user) {
      router.replace("/(tabs)/home");
    } else {
      router.replace("/login");
    }
  }, [user, loading]);

  // Don't render anything until we know the auth state
  if (loading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="post/[id]/index" />
      <Stack.Screen name="post/[id]/edit" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PostProvider>
        <RootLayoutNav />
      </PostProvider>
    </AuthProvider>
  );
}