import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, useColorScheme, View } from "react-native";
import React, { useState } from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import { Link } from "expo-router/build/link/Link";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import { Colors } from "../../constants/colors";
import { useUser } from "../../hooks/useUser";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useUser();
  const [error, setError] = useState<string | null>(null);
  const colorScheme = useColorScheme();
      const theme =
        Colors[colorScheme === "dark" ? "dark" : "light"] ?? Colors.light;
  

  async function handleSubmit(): Promise<void> {
    setError(null); // Clear previous errors
    try {
      await register(email, password);
      console.log("Register submitted", email, password);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during registration.",
      );
    }
  }

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <ThemedText title={true} style={styles.title}>
              Create a New Account
            </ThemedText>

            <ThemedTextInput
              style={{ width: "80%", marginBottom: 20, color: Colors.primary }}
              placeholder="Email"
              placeholderTextColor={theme.placeholderTextColor}
              keyboardType="email-address"
              autoCapitalize="none"
              autoFocus
              value={email}
              onChangeText={setEmail}
            />

            <ThemedTextInput
              style={{ width: "80%", color: "#fff" }}
              placeholder="Password"
              placeholderTextColor={theme.placeholderTextColor}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Spacer />

            {error && (
              <ThemedText style={{ color: "red", marginBottom: 10 }}>
                {error}
              </ThemedText>
            )}

            <ThemedButton onPress={() => handleSubmit()}>
              <Text style={{ color: "white", textAlign: "center" }}>Register</Text>
            </ThemedButton>

            <Spacer height={100} />
            <Link href="/login" style={styles.link}>
              <ThemedText style={{ textAlign: "center" }}>Login instead</ThemedText>
            </Link>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "blue",
  },
});
