import express from "express";
import { connectDB } from "./src/config/db.js";
import authRouter from "./src/routes/auth.route.js";
import movieRouter from "./src/routes/movie.route.js";
import reviewRouter from "./src/routes/review.route.js";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/reviews", reviewRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port ${port}`));
