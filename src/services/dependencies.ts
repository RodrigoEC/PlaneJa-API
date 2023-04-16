import { DependenciesNotCreated } from "../util/errors";
import { Dependencies } from "../util/interfaces";
import { collections } from "./classesOffered/db";

/**
 * Insert new classes dependencies for a specific course
 *
 * @param dependencies (Dependencies) new Dependencies object
 */
export const insertDependencies = async (dependencies: Dependencies) => {
  const result = await collections.dependencies?.replaceOne(
    { name: dependencies.name },
    { name: dependencies.name, dependencies: dependencies.dependencies },
    { upsert: true }
  );

  if (!result) throw new DependenciesNotCreated(dependencies.name);
  return await collections.dependencies?.findOne({ name: dependencies.name });
};

/**
 * Update new classes dependencies for a specific course
 *
 * @param dependencies (Dependencies) new Dependencies object
 */
export const updateDependencies = async (
  dependencies: Dependencies,
  replace: boolean
) => {
  if (replace) {
    await insertDependencies(dependencies);
    const { replace, ...rest } = dependencies;
    return rest;
  }

  const formerDeps = await collections.dependencies?.findOne({
    name: dependencies.name,
  });

  let deps = dependencies.dependencies;
  if (formerDeps) {
    Object.keys(formerDeps).forEach((dep) => (deps[dep] = formerDeps[dep]));
  }

  const result = await collections.dependencies?.replaceOne(
    { name: dependencies.name },
    deps,
    { upsert: true }
  );

  if (!result) throw new DependenciesNotCreated(dependencies.name);
};

/**
 * Update new classes dependencies for a specific course
 *
 * @param dependencies (Dependencies) new Dependencies object
 */
export const getDependencies = async (course: string) => {
  const deps = await collections.dependencies?.findOne({
    name: course,
  });

  if (!deps) throw new DependenciesNotCreated(course);
  else return deps.dependencies;
};
