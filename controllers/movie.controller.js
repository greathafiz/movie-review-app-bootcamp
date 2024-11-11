import Movie from "../models/movie.model.js";

export const createMovie = async (req, res) => {
  try {
    const { title, director, genre, releaseYear } = req.body;
    const newMovie = new Movie({
      title,
      director,
      genre,
      releaseYear,
    });
    await newMovie.save();
    // simply write - await Tank.create(req.body);
    res
      .status(201)
      .json({ data: newMovie, message: "Resource created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const filter = {};
    const { releaseYear } = req.query;

    ["title", "director", "genre"].forEach((field) => {
      if (req.query[field]) {
        filter[field] = { $regex: req.query[field], $options: "i" };
      }
    });

    if (releaseYear) {
      filter.releaseYear = releaseYear;
    }
    console.log(filter);

    const movies = await Movie.find(filter).sort("createdAt");
    res.status(200).json({
      data: movies,
      total: movies.length,
      message: "Resource fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const getSingleMovie = async (req, res) => {
  try {
    const { id: movieId } = req.params;
    const movie = await Movie.findOne({ _id: movieId });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res
      .status(200)
      .json({ data: movie, message: "Resource fetched successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { id: movieId } = req.params;
    const movie = await Movie.findOneAndUpdate({ _id: movieId }, req.body, {
      new: true,
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res
      .status(200)
      .json({ data: movie, message: "Resource updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id: movieId } = req.params;
    const movie = await Movie.findOneAndDelete({ _id: movieId });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res
      .status(200)
      .json({ data: movie, message: "Resource deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const getMovieReviews = async (req, res) => {
  res.send("reviews");
};
