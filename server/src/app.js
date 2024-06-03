import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import apiRouter from "./routes/api.routes.js";

app.use("/api", apiRouter);

export default app;
