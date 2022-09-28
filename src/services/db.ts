import * as mongoDB from "mongodb";
import { CourseNotCreated, CourseNotFound } from "../util/errors";
import { Semester } from "./extractPajamas";

export const collections: { classesOffered?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DATABASE_URL as string
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const gamesCollection: mongoDB.Collection = db.collection("planeja");

  collections.classesOffered = gamesCollection;
  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`
  );
}

export const getClassesOffered = async (course: string, semester: string) => {
  const query = { name: course, semester };
  const result = await collections.classesOffered?.findOne(query);
  if (!result) throw new CourseNotFound(course, semester);
  return result;
};

export const insertClassesOffered = async (classesOffered: Semester) => {
  const result = await collections.classesOffered?.insertOne(classesOffered);
  if (!result) throw new CourseNotCreated(classesOffered.name);
};
