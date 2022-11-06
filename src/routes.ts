import os from "os";
import express, { Request, Response } from "express";
import multer from "multer";
import { extractRecord } from "./controllers/record";
import {
  excludeClassesOffered,
  retrieveClassesOffered,
  retrieveUniqueClasses,
} from "./controllers/classes";
import { extractClassesOffered } from "./controllers/classes";

export const router = express.Router();
const upload = multer({ dest: os.tmpdir() });

router.post("/records", upload.single("file"), extractRecord);
router.post("/classes-offered", upload.single("file"), extractClassesOffered);
router.get("/classes-offered", retrieveClassesOffered);
router.delete("/classes-offered", excludeClassesOffered);
router.get("/unique-subjects", retrieveUniqueClasses);
router.get("/", (req: Request, res: Response) => {
  res.send("Code with Rico. Ready to run on Heroku.");
});
