import express, { Application } from "express";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";
import run from "./runserver.js";
import router from "./router/router.js";

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

const PORT = 5000;
app.listen(PORT, () => run(PORT));
