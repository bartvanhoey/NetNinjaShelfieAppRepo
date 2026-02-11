import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ThemedText title={true} style={styles.title}>
          Create a New Account
        </ThemedText>

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
          <Text style={{ color: "white", textAlign: "center" }}>Register</Text>
        </ThemedButton>

        <Spacer height={100} />
        <Link href="/login" style={styles.link}>
          <ThemedText style={{ textAlign: "center" }}>Login instead</ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Register;

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
});
