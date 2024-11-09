import express from "express";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port ${port}`));
