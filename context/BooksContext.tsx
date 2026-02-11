import { createContext, useState, useEffect } from "react";
import { client, db } from "../lib/appwrite";
import { ID, Models, Permission, Query, Role } from "react-native-appwrite";
import { BookType } from "../types/book-type";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = "698c5df20037c9062408"; // Replace with your actual database ID
const BOOKS_TABLE_ID = "books"; // Replace with your actual collection ID

export const BooksContext = createContext<{
  books: BookType[];
  fetchBooks: () => Promise<void>;
  fetchBook: (id: string) => Promise<BookType | null>;
  deleteBook: (id: string) => Promise<void>;
  createBook: (book: BookType) => Promise<void>;
}>({
  books: [],
  fetchBooks: async () => {},
  fetchBook: async (id: string) => null,
  deleteBook: async (id: string) => {},
  createBook: async (book: BookType) => {},
});

export const BooksContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<BookType[]>([]);
  const { user } = useUser();

  async function fetchBooks() {
    try {
      const response = await db.listRows<BookType>(
        DATABASE_ID,
        BOOKS_TABLE_ID,
        [
          Query.equal(
            "userId",
            user?.$id ??
              (() => {
                throw new Error("User must be logged in to create a book");
              })(),
          ), // Fetch only books created by the current user
        ],
      );
      setBooks(response.rows);
      console.log("Books fetched successfully:", response.rows);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  async function fetchBook(id: string): Promise<BookType | null> {
    try {
      const response = await db.getRow<BookType>(
        DATABASE_ID,
        BOOKS_TABLE_ID,
        id,
      );
      return response;
    } catch (error) {
      console.error(`Error fetching book with id ${id}:`, error);
      throw error;
    }
  }

  async function deleteBook(id: string) {
    try {
      await db.deleteRow(DATABASE_ID, BOOKS_TABLE_ID, id);
      setBooks((prevBooks) => prevBooks.filter((book) => book.$id !== id));
    } catch (error) {
      console.error(`Error deleting book with id ${id}:`, error);
    }
  }
  async function createBook(book: BookType) {
    try {
      const response = await db.createRow<BookType>(
        DATABASE_ID,
        BOOKS_TABLE_ID,
        ID.unique(),
        {
          ...book,
          userId:
            user?.$id ??
            (() => {
              throw new Error("User must be logged in to create a book");
            })(),
        }, // Ensure userId is set to the current user's ID or an empty string if no user is logged in
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ], // Allow anyone to read, but only the owner can write
      );

      console.log("Book created successfully:", response);

      //   setBooks((prevBooks) => [...prevBooks, response as BookType]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  }

  useEffect(() => {
    if (!user) {
      setBooks([]);
      return;
    }

    const channel = `databases.${DATABASE_ID}.tables.${BOOKS_TABLE_ID}.rows`;

    fetchBooks();

    const unsubscribe = client.subscribe(channel, (response) => {
      const { payload, events } = response;
      console.log("Received real-time update:", response);
      if (
        events.includes(
          `databases.${DATABASE_ID}.tables.${BOOKS_TABLE_ID}.rows.*.create`,
        )
      ) {
        console.info("events.includes: New book created:", payload);
        setBooks((prevBooks) => [...prevBooks, payload as BookType]);
      } else if (
        events.includes(
          `databases.${DATABASE_ID}.tables.${BOOKS_TABLE_ID}.rows.*.delete`,
        )
      ) {
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book.$id !== (payload as BookType).$id),
        );
      } else if (
        events.includes(
          `databases.${DATABASE_ID}.tables.${BOOKS_TABLE_ID}.rows.*.update`,
        )
      ) {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.$id === (payload as BookType).$id
              ? (payload as BookType)
              : book,
          ),
        );
      } else {
        console.error("Unhandled event type:", events);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, fetchBook, deleteBook, createBook }}
    >
      {children}
    </BooksContext.Provider>
  );
};
