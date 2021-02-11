import React, { useCallback, useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

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
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const { data: newGenres } = await getGenres();
    setGenres(newGenres);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const movieId = match.params.id;
    if (movieId === "new-movie") return;
    try {
      const { data: movie } = await getMovie(movieId);
      setMovie(movie);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404)
        history.replace("/not found");
    }
  };

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

  const doSubmit = async () => {
    if (movie) {
      const newData = { ...data, _id: movie._id };
      await saveMovie(newData);
      history.replace("/");
      return;
    }
    await saveMovie(data);
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
