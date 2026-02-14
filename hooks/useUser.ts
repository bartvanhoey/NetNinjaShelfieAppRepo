import { useContext } from "react";
import  { AuthContext, AuthContextType } from "../context/AuthContext";

export function useUser() {
  const context = useContext<AuthContextType | undefined>(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context;
}