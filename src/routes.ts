import os from "os";
import express from "express";
import multer from "multer";
import { extractPajama, extractRecord } from "./controllers/extract";
import {
  excludeClassesOffered,
  retrieveClassesOffered,
} from "./controllers/retrieve";

export const router = express.Router();
const upload = multer({ dest: os.tmpdir() });

router.post("/records", upload.single("file"), extractRecord);
router.post("/classes-offered", upload.single("file"), extractPajama);
router.get("/classes-offered", retrieveClassesOffered);
router.delete("/classes-offered", excludeClassesOffered);
