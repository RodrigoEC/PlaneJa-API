import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { router } from "./routes";
import { connectToDatabase } from "./services/classesOffered/db";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 8080;

const logger = (req: Request, res: Response, next: NextFunction) => {
  res.on("finish", () =>
    console.log(
      `>>> ${req.method} - Requisição: ${req.path} - ${res.statusCode}`
    )
  );
  next(); // Passing the request to the next handler in the stack.
};

const app = express();
app.use(express.static('public'))
app.use(logger);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(router);

connectToDatabase();
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
