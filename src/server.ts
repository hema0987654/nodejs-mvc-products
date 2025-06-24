import express, { Application } from "express";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";
import helmet, { contentSecurityPolicy } from "helmet";
import run from "./runserver.js";
import router from "./router/router.js";
import ErroMiddleWare from "./Middlewares/erroMiddelware.js";
import NotFound from "./Middlewares/NotFound.js";
import dontev from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);
app.use(ErroMiddleWare.handel);
app.use(NotFound.handel);
app.use(
    helmet({
        contentSecurityPolicy: false,
        
        frameguard: {
            action: "deny",
        },
    })
);
console.log(process.env.PORT);
dontev.config();

app.listen(process.env.PORT, () => run(Number(process.env.PORT)));
