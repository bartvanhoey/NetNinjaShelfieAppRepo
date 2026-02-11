import { useContext } from "react";
import  { BooksContext } from "../context/BooksContext";

export function useBooks() {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksContextProvider");
  }
  return context;
}