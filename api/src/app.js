import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import session from "express-session";
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
// ! middlewares
app.use(session({
    secret: 'jDZk8F3nYs5pRQaW',
    resave: false,
    saveUninitialized: false
  }));
// ? routes
app.use("/api", routes);

export default app


