import * as mongoDB from "mongodb";
import { CourseNotCreated, CourseNotFound } from "../util/errors";
import { Semester } from "./extract/classesOffered";

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
  return (await collections.classesOffered?.findOne(query)) ?? {};
};

export const insertClassesOffered = async (classesOffered: Semester) => {
  const { name, semester }: { name: string; semester: string } = classesOffered;
  const query = { name, semester };
  const options = { upsert: true };
  const result = await collections.classesOffered?.replaceOne(
    query,
    classesOffered,
    options
  );
  if (!result) throw new CourseNotCreated(classesOffered.name);
};
