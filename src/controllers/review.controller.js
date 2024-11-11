import Review from "../models/review.model.js";
import Movie from "../models/movie.model.js";
import User from "../models/user.model.js";
import { updateMovieRating } from "../utils/updateMovieRating.js";

export const createReview = async (req, res) => {
  try {
    const {
      body: { movieId, comment, rating },
      user: { id: userId },
    } = req;

    // get the user's name
    const user = await User.findById(userId);

    // check if movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    // create the review
    const review = await Review.create({
      reviewerName: user.username,
      reviewerId: userId,
      comment,
      rating,
      movie: movieId,
    });

    // update the movie's reviews
    await movie.updateOne({ $push: { reviews: review._id } });

    updateMovieRating(movieId);

    res
      .status(201)
      .json({ data: review, message: "Resource created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const getSingleReview = async (req, res) => {
  try {
    const { id: reviewId } = req.params;
    const review = await Review.findOne({ _id: reviewId });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res
      .status(200)
      .json({ data: review, message: "Resource fetched successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const {
      user: { id: userId, role: userRole },
      params: { id: reviewId },
    } = req;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    const movieId = review.movie;

    // if the logged-in user is neither the creator nor an admin, deny
    if (
      userId.toString() !== review.reviewerId.toString() &&
      userRole !== "admin"
    ) {
      return res.status(403).json({ message: "This operation is not allowed" });
    }

    // remove the review from the movie's reviews array
    const movie = await Movie.findById(movieId);
    movie.reviews = movie.reviews.filter((rev) => rev.toString() !== reviewId);
    await movie.save();

    review.deleteOne();

    updateMovieRating(movieId);

    res
      .status(200)
      .json({ data: review, message: "Resource deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
