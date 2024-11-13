import express from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovieReviews,
  getSingleMovie,
  updateMovie,
} from "../controllers/movie.controller.js";
import { authenticate, isAdmin } from "../middlewares/auth.middleware.js";

const movieRouter = express.Router();
const admin = [authenticate, isAdmin]; // this is possible because you can store middlewares in an array

// only an admin can create, update, delete movies

movieRouter.route("/").post(admin, createMovie).get(authenticate, getAllMovies);
movieRouter
  .route("/:id")
  .get(authenticate, getSingleMovie)
  .delete(admin, deleteMovie)
  .put(admin, updateMovie);

// to get all the reviews of a movie
movieRouter.get("/:id/reviews", authenticate, getMovieReviews);

export default movieRouter;
