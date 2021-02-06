import React, { useCallback, useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

const schema = {
  genreId: Joi.string(),
  title: Joi.string().min(3).required().label("Movie Title"),
  numberInStock: Joi.number()
    .min(1)
    .max(100)
    .required()
    .label("Number in stock"),
  dailyRentalRate: Joi.number().min(1).max(10).required().label("Rate"),
};

const MovieForm = ({ match, history }) => {
  const {
    data,
    handleSubmit,
    renderSelect,
    renderInput,
    renderButton,
    setData,
  } = useForm(schema);
  const [genres, setGenres] = useState([]);
  const [movie, setMovie] = useState();

  useEffect(() => {
    const newGenres = getGenres();
    setGenres(newGenres);
  }, []);

  useEffect(() => {
    const movieId = match.params.id;
    const movie = getMovie(movieId);
    if (!movie) return history.replace("/not found");
    setMovie(movie);
  }, [match, history]);

  const setMovieForm = useCallback(() => {
    let movieForm = {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    };
    if (match.params.id !== "new-movie" && movie) {
      const id = movie.genre._id;
      movieForm = {
        title: movie.title,
        genreId: id,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate,
      };
    }

    setData(movieForm);
  }, [setData, movie, match.params.id]);

  useEffect(() => {
    setMovieForm();
  }, [setMovieForm]);

  const doSubmit = () => {
    if (movie) {
      const newData = { ...data, _id: movie._id };
      saveMovie(newData);
      history.replace("/");
      return;
    }

    saveMovie(data);
    history.replace("/");
  };

  const formSubmitHandler = (e) => handleSubmit(e, doSubmit());

  return (
    <div className="row">
      <div className="col-sm-4" />
      <div className="col-sm-4">
        <h4 className="text-center">Movie Form</h4>
        <form className="auth" onSubmit={formSubmitHandler}>
          {renderInput("title", "Movie name")}
          {renderSelect("genreId", "Genre", genres)}
          {renderInput("numberInStock", "Number in stock", "number")}
          {renderInput("dailyRentalRate", "Rate", "number")}
          {renderButton("Submit")}
        </form>
      </div>
      <div className="col-sm-4" />
    </div>
  );
};

export default MovieForm;
