import express, { Express } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import allRoutes from "./routes";
import dotenv from "dotenv";
import helmet from "helmet";
import Logger from "./util/logger/logger";
import { errorHandler } from "./middleware/errorhandler.middleware";
import monitor from "express-status-monitor";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT: string | number = process.env.PORT || 80;

const app: Express = express();

app.use(monitor({ path: "/status" }));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Log the request */
app.use((req, res, next) => {
  /** Log the req */
  Logger.info(
    `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    /** Log the res */
    Logger.info(
      `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
    );
  });

  next();
});

/** Rules of our API */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.use(allRoutes);
app.use(errorHandler);

/** 404 Error handling */
app.use((_, res) => {
  const error = new Error("Not found");

  Logger.error(error);

  res.status(404).json({
    message: error.message,
  });
});

const uri: string = process.env.DB as string;

/** Connect to mongo */
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    Logger.debug(`Mongodb connected successfully`);
  })
  .catch((error) => {
    Logger.error(`unable to connect - ${error.message}`);
    throw error;
  });

/** Configure Socket.io and pass the Express app instance **/
app.listen(PORT, () => {
  Logger.info(`Server is running on http://localhost:${PORT}`);
});
