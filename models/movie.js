const mongoose = require("mongoose");
const { genreSchema } = require("../models/genre");
const Joi = require("joi");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [1, "At least 1 character needed. You entered {VALUE}"],
    maxlength: [150, "Maximum 50 characters allowed. You entered {VALUE}"],
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
  },
  dailyRentalRate: { Number, default: 0 },
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(3).required(),
    genre: Joi.string().min(1).required(),
    numberInStock: Joi.number().required(),
    //dailyRentalRate: Joi.number(),
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
