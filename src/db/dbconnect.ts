import { MongoClient } from "mongodb";
import { uri } from "./secret";

export const getDb = async () => {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db("halls");
};