import os from "os";
import express from "express";
import multer from "multer";
import { extractPajama, extractRecord } from "./controllers/extract";
import { retrieveClassesOffered } from "./controllers/retrieve";

export const router = express.Router();
const upload = multer({ dest: os.tmpdir() });

router.post("/extract/records", upload.single("file"), extractRecord);
router.post("/extract/classes-offered", upload.single("file"), extractPajama);
router.post("/retrieve/classes-offered", retrieveClassesOffered);
