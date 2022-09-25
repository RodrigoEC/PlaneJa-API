import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { router } from "./routes";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 7000;

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`>>> Requisição: ${req.path} - ${res.statusCode}`);
  next(); // Passing the request to the next handler in the stack.
};

const app = express();
app.use(helmet());
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
