import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useUser } from "../../hooks/useUser";
import NotLoggedInUserOnly from "../../components/auth/NotLoggedInUserOnly";

const AuthLayout = () => {
  const { user } = useUser();
  console.log("User in AuthLayout:", user);

  return (
    <NotLoggedInUserOnly>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{ headerShown: false, animation: "slide_from_bottom" }}
      />
    </NotLoggedInUserOnly>
  );
};

export default AuthLayout;
