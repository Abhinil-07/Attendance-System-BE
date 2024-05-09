require("dotenv").config();
import express, { Application } from "express";
import cors from "cors";
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.get("/", async (req, res) => {
  res.status(200).json("Health check endpoint for the server test 2");
});

export { app };
