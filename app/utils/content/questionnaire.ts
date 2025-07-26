import { MongoClient, ServerApiVersion } from "mongodb";

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;

type question = {
  questionnaireId: number;
  questionId: number;
  answerId: number;
};

const uri = `mongodb+srv://${db_username}:${db_password}@cluster0.4xnbwfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export default async function GetAnswerId(questionId: number) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  const database = client.db("free-drink");
  const questions = database.collection("questions");
  // Queries for a movie that has a title value of 'Back to the Future'
  const query = { questionId: questionId };
  const question = (await questions.findOne<question>(query)) as question;

  return question.answerId;
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
