import express from "express";
import { connectDB } from "./config/db.js";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port ${port}`));
