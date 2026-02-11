import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "../../../constants/colors";
import ThemedCard from "../../../components/ThemedCard";
import Spacer from "../../../components/Spacer";
import { useBooks } from "../../../hooks/useBooks";
import { BookType } from "../../../types/book-type";
import ThemedButton from "../../../components/ThemedButton";

const BookDetailsScreen = () => {
  const [book, setBook] = useState<BookType | null>(null);
  const { id } = useLocalSearchParams();
  console.log("Book ID:", id);
  const { fetchBook, deleteBook } = useBooks();
  const router = useRouter();

  useEffect(() => {
    async function loadBook() {
      const bookData = await fetchBook(id as string);
      setBook(bookData);
    }

    loadBook();

    return () => setBook(null);
  }, [id]);

  const handleDelete = async () => {
    await deleteBook(id as string);
    setBook(null)
    router.replace('/books')
  }

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedText style={styles.title}>{book?.title}</ThemedText>
        <ThemedText>Written by {book?.author}</ThemedText>
        <Spacer />

        <ThemedText title={true}>Book description:</ThemedText>
        <Spacer height={10} />

        <ThemedText>{book?.description}</ThemedText>
      </ThemedCard>

      <ThemedButton onPress={handleDelete} style={styles.delete}>
        <ThemedText style={{ color: '#fff', textAlign: 'center' }}>Delete Book</ThemedText>
      </ThemedButton> 
    </ThemedView>
  );
};

export default BookDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  card: {
    margin: 20,
  },
  delete: {
    marginTop: 40,
    backgroundColor: Colors.warning,
    width: 200,
    alignSelf: "center",
  },
});
