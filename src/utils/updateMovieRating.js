import Movie from "../models/movie.model.js";

export const updateMovieRating = async (movieId) => {
  // Find the movie by its ID and populate the reviews
  const movie = await Movie.findById(movieId).populate("reviews");

  if (!movie) {
    throw new Error("Movie not found");
  }

  // Calculate the average rating
  const totalReviews = movie.reviews.length;

  if (!totalReviews === 0) {
    const totalRating = movie.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    movie.rating = totalRating / totalReviews;
  }

  // Save the movie with the updated rating
  await movie.save();
};
