import * as mongoDB from "mongodb";
import { CourseNotCreated } from "../util/errors";
import { defaultSemester, Semester } from "./extract/classesOffered";

export const collections: { classesOffered?: mongoDB.Collection } = {};

/**
 * Function responsible for connecting the backend to the database and set the collection's
 * database key "ClassesOffered".
 */
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

export const getClassesOffered = async (name: string, semester: string): Promise<Semester> => {
  const query = { name, semester };
  const subject: any = await collections.classesOffered?.findOne(query)
  return subject || defaultSemester;
};

export const getSubjectsCourse = async (course: string): Promise<Semester[]> => {
  const query = { name: course };
  const subject: any = await collections.classesOffered?.find(query).toArray()
  return subject || defaultSemester;
}
export const deleteClassesOffered = async (name: string, semester: string) => {
  const query = { name, semester };
  return (await collections.classesOffered?.deleteOne(query)) ?? {};
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
