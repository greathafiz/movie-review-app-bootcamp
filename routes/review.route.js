import express from "express";
import {
  createReview,
  deleteReview,
} from "../controllers/review.controller.js";
const reviewRouter = express.Router();

reviewRouter.post("/", createReview);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;
