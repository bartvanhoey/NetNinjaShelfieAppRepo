import { Client, TablesDB, Account, Avatars, Databases } from "react-native-appwrite";

export const client = new Client();
client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("e4b2a9f6-3c71-4d8a-9f50-1b7c6e2a8d93") // Replace with your project ID
  .setPlatform('com.bartvanhoey.shelfie_app');


export const account = new Account(client);
export const db = new TablesDB(client);
export const avatars = new Avatars(client);
// export const db = new Databases(client);