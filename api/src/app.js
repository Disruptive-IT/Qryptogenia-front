import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { CorsConfig } from "./lib/cors.config.js";
import morgan from "morgan";

const app = express();
//! config
app.use(cors(CorsConfig));
app.use(express.json());
app.use(morgan('dev'))
// ! middlewares

// ? routes
app.use("/api", routes);

export default app
