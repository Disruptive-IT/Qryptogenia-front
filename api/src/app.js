import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { CorsConfig } from "./lib/cors.config.js";
import morgan from "morgan";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const app = express();
//! config
app.use(cors(CorsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'))
app.use(upload.single('profile_picture'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ! middlewares

// ? routes
app.use("/api", routes);

export default app


