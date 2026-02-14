import { StyleSheet } from "react-native";
import { Link } from "expo-router";

// themed components
import ThemedView from "../components/ThemedView";
import ThemedLogo from "../components/ThemedLogo";
import Spacer from "../components/Spacer";
import ThemedText from "../components/ThemedText";
import React from "react";
const HomeScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedLogo />
      <Spacer height={20}></Spacer>
      {/* <Image source={LightLogo} style={styles.logo} /> */}
      {/* <Image source={require("../assets/icon.png")} style={styles.icon} />  */}
      <ThemedText title={true} style={[styles.title]}>
        The Number 1
      </ThemedText>
      <Spacer height={10} />
      <ThemedText>READING LIST APP</ThemedText>
      <Spacer />
      {/* <View style={styles.card}>
        <Text>Hello, this is a card</Text>
      </View> */}
      {/* <Link href="/about" style={styles.link}>
        <ThemedText>About Page</ThemedText>
      </Link>
      <Link href="/contact" style={styles.link}>
        <ThemedText>Contact Page</ThemedText>
      </Link> */}
      <Link href="/login" style={styles.link}>
        <ThemedText>Login Page</ThemedText>
      </Link>
      {/* <Link href="/profile" style={styles.link}>
        <ThemedText>Profile Page</ThemedText>
      </Link> */}
      {/* <Link href="/books" style={styles.link}>
        <ThemedText>Books Page</ThemedText>
      </Link> */}
      {/* <Link href="/create" style={styles.link}>
        <ThemedText>Create Page</ThemedText>
      </Link> */}
    </ThemedView>
  );
};

export default HomeScreen;

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
  //   logo: {
  //     marginVertical: 20,
  //     width: 120,
  //     height: 120,
  //   },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "blue",
  },
});
