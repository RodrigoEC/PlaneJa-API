import os from "os";
import express from "express";
import multer from "multer";
import { extractRecord } from "./controllers/extractRecord";

export const router = express.Router();
const upload = multer({ dest: os.tmpdir() });

router.post("/extract-record", upload.single("file"), extractRecord);
