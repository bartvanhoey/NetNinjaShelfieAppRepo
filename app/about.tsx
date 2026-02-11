import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import React from "react";
import ThemedText from "../components/ThemedText";
import ThemedView from "../components/ThemedView";

const AboutScreen = () => {
  // const colorScheme = useColorScheme();
  // const theme = Colors[colorScheme as "light" | "dark"] ?? Colors.light;

  // console.log("Current color scheme:", colorScheme);
  // console.log("Current theme:", theme);

  return (
    <ThemedView
      style={[styles.container ]}
    >
      <ThemedText style={[styles.title, ]}>
        About Page
      </ThemedText>
      <Link href="/" style={[styles.link]}>
        <ThemedText>Home Screen</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  subTitle: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 30,
  },
  //   card: {
  //     backgroundColor: "#eee",
  //     padding: 20,
  //     borderRadius: 8,
  //     boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  //   },
  logo: {
    marginVertical: 20,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "blue",
  },
});
