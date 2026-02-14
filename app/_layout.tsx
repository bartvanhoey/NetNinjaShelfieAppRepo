import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React, { use } from "react";
import { Stack } from "expo-router";
import { Colors } from "../constants/colors";
import { StatusBar } from "expo-status-bar";
import { AuthContextProvider } from "../context/AuthContext";
import { BooksContextProvider } from "../context/BooksContext";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme as "light" | "dark"] ?? Colors.light;

  console.log("Current color scheme:", colorScheme);
  console.log("Current theme:", theme);

  return (
    <AuthContextProvider>
      <BooksContextProvider>
        <StatusBar style={colorScheme === "dark" ? "dark" : "light"} />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: theme.navBackground },
            headerTintColor: theme.textColor,
          }}
        >
          <Stack.Screen
            name="index"
            options={{ headerShown: false, title: "Home" }}
          />
          <Stack.Screen name="about" options={{ title: "About Us" }} />
          <Stack.Screen name="contact" options={{ title: "Contact Us" }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
        </Stack>
      </BooksContextProvider>
    </AuthContextProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
