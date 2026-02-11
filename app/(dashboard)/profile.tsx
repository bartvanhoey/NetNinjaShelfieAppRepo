import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { useUser } from "../../hooks/useUser";
import ThemedButton from "../../components/ThemedButton";

const Profile = () => {
 const {logout, user} = useUser();

 console.log("User in Profile screen:", user);

  return (
    <ThemedView style={styles.container}>
      <ThemedText title={true} style={styles.heading}>
        {user?.email ? `Welcome, ${user.email}!` : "You're not logged in!"}
      </ThemedText>
      <Spacer/>
      <ThemedText>Time to start reading some books...</ThemedText>
      <Spacer/>
      <ThemedButton onPress={logout}>
        <Text style={{ color: "white", textAlign: "center" }}>Logout</Text>
      </ThemedButton>
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
