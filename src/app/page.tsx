"use client";

import { useEffect, useState } from "react";
import RatingFilter from "@/components/RatingFilter";
import MovieCard from "@/components/MovieCard";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// TODO: Refactor typescript
// TODO: Refactor fetching
// TODO: move movies, genres queries into a server component if possible
// TODO: Separate components into own files and folders
// TODO: Cache the genres

export default function Home() {
  const [movies, setMovies] = useState<any[] | null>(null);
  const [genres, setGenres] = useState<any[] | null>(null);
  const [minRating, setMinRating] = useState<string>("0");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  }, []);

  useEffect(() => {
    const genreQuery = selectedGenres.length
      ? `&with_genres=${selectedGenres.join(",")}`
      : "";
    const ratingQuery = `&vote_average.gte=${minRating}`;
    const pageQuery = `&page=${page}`;

    fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}${genreQuery}${ratingQuery}${pageQuery}&include_adult=false`,
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      });
  }, [selectedGenres, minRating, page]);

  const toggleGenre = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId],
    );
    setPage(1);
  };

  const handleRatingChange = (value: string) => {
    setMinRating(value);
    setPage(1);
  };

  console.log(movies);
  console.log(genres);

  return (
    <div className="container mx-auto py-4 flex flex-col gap-4">
      <h3>Filter by genres</h3>
      <div className={"flex flex-wrap gap-4"}>
        {(genres || []).map((genre) => (
          <label key={genre.id}>
            <input
              type="checkbox"
              className={"mr-2"}
              value={genre.id}
              checked={selectedGenres.includes(genre.id)}
              onChange={() => toggleGenre(genre.id)}
            />
            {genre.name}
          </label>
        ))}
      </div>
      <div>
        <h3>Filter by minimum rating</h3>
        <div>
          <RatingFilter onChange={handleRatingChange} value={minRating} />
        </div>
      </div>
      <div>
        {!movies || movies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>

      <div className={"w-full mx-auto text-center"}>
        <button
          className="btn btn-outline mr-2"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          ⬅ Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-outline ml-2"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
