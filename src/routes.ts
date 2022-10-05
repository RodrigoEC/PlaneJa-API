import os from "os";
import express from "express";
import multer from "multer";
import { extractRecord } from "./controllers/record";
import {
  excludeClassesOffered,
  retrieveClassesOffered,
} from "./controllers/classes";
import { extractClassesOffered } from "./controllers/classes";

export const router = express.Router();
const upload = multer({ dest: os.tmpdir() });

router.post("/records", upload.single("file"), extractRecord);
router.post("/classes-offered", upload.single("file"), extractClassesOffered);
router.get("/classes-offered", retrieveClassesOffered);
router.delete("/classes-offered", excludeClassesOffered);
