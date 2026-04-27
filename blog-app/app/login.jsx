import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Validation", "Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      router.replace("/(tabs)/home");
    } catch (err) {
      Alert.alert(
        "Login Failed",
        err.response?.data?.message || "Invalid credentials. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50 justify-center px-6"
    >
      {/* Logo / Title */}
      <View className="items-center mb-10">
        <Text className="text-4xl font-bold text-indigo-600">BlogApp</Text>
        <Text className="text-gray-400 mt-1">Sign in to continue</Text>
      </View>

      {/* Email */}
      <Text className="text-sm font-semibold text-gray-700 mb-1">Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        placeholderTextColor="#9ca3af"
        keyboardType="email-address"
        autoCapitalize="none"
        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base mb-4"
      />

      {/* Password */}
      <Text className="text-sm font-semibold text-gray-700 mb-1">Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        placeholderTextColor="#9ca3af"
        secureTextEntry
        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base mb-6"
      />

      {/* Login button */}
      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        className={`rounded-xl py-4 items-center ${loading ? "bg-indigo-300" : "bg-indigo-500"}`}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold text-base">Sign In</Text>
        )}
      </TouchableOpacity>

      {/* Register link */}
      <TouchableOpacity
        onPress={() => router.push("/register")}
        className="mt-5 items-center"
      >
        <Text className="text-gray-400 text-sm">
          Don't have an account?{" "}
          <Text className="text-indigo-500 font-semibold">Register</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}