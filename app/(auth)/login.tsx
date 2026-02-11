import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { Link } from "expo-router/build/link/Link";
import { router } from "expo-router/build/exports";
import { Colors } from "../../constants/colors";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import { useUser } from "../../hooks/useUser";
import ThemedActivityIndicator from "../../components/ThemedActivityIndicator";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useUser();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(): Promise<void> {
    setError(null); // Clear previous errors
    console.log("Login submitted", email, password);
    console.log("Current user:", user);
    // Simulate successful login by setting a dummy user object
    // In a real app, you would authenticate against an API and set the user context accordingly
    // For example:
    // login(email, password).then(user => setUser(user));
    try {
      await login(email, password);
      router.push("/profile");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during login.",
      );
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ThemedText title={true} style={styles.title}>
          Login to Your Account
        </ThemedText>
        {/* 
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => handleSubmit()}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Login
        </Text>
      </Pressable> */}

        {/* <TextInput placeholder="Email" keyboardType="email-address" autoCapitalize="none" /> */}

        <ThemedTextInput
          style={{ width: "80%", marginBottom: 20, color: Colors.primary }}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <ThemedTextInput
          style={{ width: "80%", color: "#fff" }}
          placeholder="Password"
          placeholderTextColor="#888"
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
          <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
        </ThemedButton>

        <Spacer height={100} />
        <Link href="/register" style={styles.link}>
          <ThemedText style={{ textAlign: "center" }}>
            Register instead
          </ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});
