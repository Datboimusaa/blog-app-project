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

export default function RegisterScreen() {
  const { register } = useAuth();

  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Validation", "All fields are required.");
      return;
    }

    setLoading(true);
    try {
      await register(name.trim(), email.trim(), password);
      router.replace("/(tabs)/home");
    } catch (err) {
      Alert.alert(
        "Registration Failed",
        err.response?.data?.message || "Something went wrong. Try again."
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
      <View className="items-center mb-10">
        <Text className="text-4xl font-bold text-indigo-600">BlogApp</Text>
        <Text className="text-gray-400 mt-1">Create your account</Text>
      </View>

      <Text className="text-sm font-semibold text-gray-700 mb-1">Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Your full name"
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base mb-4"
      />

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

      <Text className="text-sm font-semibold text-gray-700 mb-1">Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        placeholderTextColor="#9ca3af"
        secureTextEntry
        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-base mb-6"
      />

      <TouchableOpacity
        onPress={handleRegister}
        disabled={loading}
        className={`rounded-xl py-4 items-center ${loading ? "bg-indigo-300" : "bg-indigo-500"}`}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-bold text-base">Create Account</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")} className="mt-5 items-center">
        <Text className="text-gray-400 text-sm">
          Already have an account?{" "}
          <Text className="text-indigo-500 font-semibold">Sign In</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}