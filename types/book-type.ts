import { Models } from "react-native-appwrite";

export interface Book {
  title: string;
  author: string;
  description: string;
  userId: string;
}

export type BookType = Models.Row & Book;