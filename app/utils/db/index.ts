import { MongoClient, ServerApiVersion } from "mongodb";

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.4xnbwfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export default function GetDB() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  return { db: client.db("free-drink"), client: client };
}
