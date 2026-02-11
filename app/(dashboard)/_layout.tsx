import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import LoggedInUserOnly from "../../components/auth/LoggedInUserOnly";

const DashBoardLayout = () => {
  const colorScheme = useColorScheme();
  const theme =
    Colors[colorScheme === "dark" ? "dark" : "light"] ?? Colors.light;

  return (
    <LoggedInUserOnly>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.navBackground,
            paddingTop: 10,
            height: 70,
          },
          tabBarActiveTintColor: theme.iconColorFocused,
          tabBarInactiveTintColor: theme.iconColor,
        }}
      >
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={focused ? theme.iconColorFocused : theme.iconColor}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="books"
          options={{
            title: "Books",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "book" : "book-outline"}
                color={focused ? theme.iconColorFocused : theme.iconColor}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "add-circle" : "add-circle-outline"}
                color={focused ? theme.iconColorFocused : theme.iconColor}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="books/[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </LoggedInUserOnly>
  );
};

export default DashBoardLayout;
