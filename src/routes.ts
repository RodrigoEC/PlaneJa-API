import os from "os";
import express, { Request, Response } from "express";
import multer from "multer";
import { extractRecord } from "./controllers/record";
import {
  excludeClassesOffered,
  retrieveClassesOffered,
  retrieveUniqueSubject,
} from "./controllers/classes";
import { extractClassesOffered } from "./controllers/classes";
import { recommendEnrollment } from "./controllers/recommend";
import { changeDependencies, createDependencies, retrieveDependencies } from "./controllers/dependencies";

export const router = express.Router();
const upload = multer({ dest: os.tmpdir() });

router.post("/records", upload.single("file"), extractRecord);
router.post("/classes-offered", upload.single("file"), extractClassesOffered);
router.get("/classes-offered", retrieveClassesOffered);
router.delete("/classes-offered", excludeClassesOffered);
router.get("/unique-subjects", retrieveUniqueSubject);
router.post("/recommend", recommendEnrollment);
router.post("/dependencies", createDependencies);
router.patch("/dependencies", changeDependencies);
router.get("/dependencies", retrieveDependencies);
router.get("/", (req: Request, res: Response) => {
  res.send("Code with Rico. Ready to run on Heroku.");
});
