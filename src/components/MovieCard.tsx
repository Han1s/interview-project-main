import React from "react";
import MoviePlaceholder from "../../public/movie_placeholder_500x750.jpg";

interface MovieProps {
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: string;
}

const MovieCard = ({ movie }: { movie: MovieProps }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : MoviePlaceholder.src;

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  return (
    <div className="card w-64 shadow-xl">
      <figure>
        <img src={posterUrl} alt={movie.title} className="h-96 object-cover" />
      </figure>
      <h2 className="card-title text-lg">{movie.title}</h2>
      <p className="text-sm text-gray-500">{releaseYear}</p>
      <p className="text-sm">⭐ {movie.vote_average}</p>
    </div>
  );
};

export default MovieCard;
