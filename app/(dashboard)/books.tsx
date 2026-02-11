import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { BooksContext } from "../../context/BooksContext";
import { FlatList } from "react-native";
import ThemedCard from "../../components/ThemedCard";
import { BookType } from "../../types/book-type";
import { useRouter } from "expo-router";

const Books = () => {
  const { books } = useContext(BooksContext);
  const router = useRouter();

  function handleOnPress(item: BookType): void {
    router.push(`/books/${item.$id}`);
  }

  return (
    <ThemedView safe={true} style={styles.container}>
      {/* <Spacer/> */}
      <ThemedText title={true} style={styles.heading}>
        Your Reading List
      </ThemedText>

      <Spacer />

      <FlatList
        data={books}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleOnPress(item)}>
            <ThemedCard style={styles.card}>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <ThemedText style={styles.author}>Written by {item.author}</ThemedText>

            </ThemedCard>
          </Pressable>
        )}
      />
    </ThemedView>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    paddingVertical: 10,
  },
  card: {
    marginVertical: 5,
    width: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  author:{
    fontSize: 14,
    color: "#ffa",
  }
});
