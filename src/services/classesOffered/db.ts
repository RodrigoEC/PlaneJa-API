/* eslint-disable @typescript-eslint/no-explicit-any */
import * as mongoDB from "mongodb";
import { CourseNotCreated } from "../../util/errors";
import { defaultSemester, Semester } from "../../util/interfaces";

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

  const planeja: mongoDB.Collection = db.collection("planeja");

  collections.classesOffered = planeja;
  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${planeja.collectionName}`
  );
}

/**
 * Function that access the database and returns the classes offered from a specific course
 * and semester.
 *
 * @param name(string) Course name
 * @param semester(string) Course semester related to the classes offered
 * @returns A Semester object if exists or the defaultSemester object.
 */
export const getClassesOffered = async (
  name: string,
  semester?: string
): Promise<Semester> => {
  const query = { name, semester };
  let subject: any = await collections.classesOffered?.findOne(query);

  if (!subject) {
    subject = defaultSemester;
  }
  delete subject.name;
  delete subject.semester;

  return subject;
};

/**
 * Function that access the database and returns a list of Semesters objects that represents
 * a list of classes offered.
 *
 * @param course (string) course name
 * @returns A list of Semesters objects
 */
export const getAllClassesOffered = async (
  course: string
): Promise<Semester[]> => {
  const query = { name: course };
  const subject: any = await collections.classesOffered?.find(query).toArray();

  return subject || [defaultSemester];
};

/**
 * Delete the course data from a specific course name and semester
 *
 * @param name (string) Course name
 * @param semester (string) Course semester related to the classes offered
 */
export const deleteClassesOffered = async (name: string, semester: string) => {
  const query = { name, semester };
  return (await collections.classesOffered?.deleteOne(query)) ?? {};
};

/**
 * Insert a new Semester object to the database
 *
 * @param classesOffered (Semester) new Semester object
 */
export const insertClassesOffered = async (classesOffered: Semester) => {
  const { name, semester } = classesOffered;
  const query = { name, semester };

  const result = await collections.classesOffered?.replaceOne(
    query,
    classesOffered,
    { upsert: true }
  );

  if (!result) throw new CourseNotCreated(name);
};
