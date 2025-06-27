import express, { Application } from "express";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";
import run from "./runserver.js";
import router from "./router/router.js";
import ErroMiddleWare from "./Middlewares/erroMiddelware.js";
import NotFound from "./Middlewares/NotFound.js";
import dotenv from "dotenv";
import morgan from "morgan";
import {rateLimit} from "express-rate-limit";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();

app.use(morgan("dev"));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: "Too many requests, please try again later."
    }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);
app.use(ErroMiddleWare.handel);
app.use(NotFound.handel);

app.listen(process.env.PORT, () => run(Number(process.env.PORT)));
