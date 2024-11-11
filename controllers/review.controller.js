import Review from "../models/review.model.js";
import Movie from "../models/movie.model.js";

export const createReview = async (req, res) => {
  try {
    const { movieId, reviewerName, comment, rating } = req.body;

    // check if movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    // create the review
    const review = await Review.create({
      reviewerName,
      comment,
      rating,
      movie: movieId,
    });

    // update the movie's reviews
    await movie.updateOne({ $push: { reviews: review._id } });

    res
      .status(201)
      .json({ data: review, message: "Resource craeted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const deleteReview = async (req, res) => {
  try {
    res.send("delete review");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
