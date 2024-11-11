import express from "express";
import {
  createReview,
  deleteReview,
  getSingleReview,
} from "../controllers/review.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const reviewRouter = express.Router();

reviewRouter.post("/", authenticate, createReview);
reviewRouter
  .route("/:id")
  .get(authenticate, getSingleReview)
  .delete(authenticate, deleteReview);

export default reviewRouter;
