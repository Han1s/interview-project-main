"use client";

import { useEffect, useState } from "react";
import RatingFilter from "@/components/RatingFilter";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// TODO: Refactor typescript
// TODO: Refactor fetching
// TODO: move movies, genres queries into a server component if possible
// TODO: Separate components into own files and folders

export default function Home() {
  const [movies, setMovies] = useState<any[] | null>(null);
  const [genres, setGenres] = useState<any[] | null>(null);
  const [minRating, setMinRating] = useState<string>("0");
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&include_adult=false`,
      );
      const data = await response.json();
      setMovies(data.results);
    };

    fetchMovies().then();
  }, []);

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

    fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}${genreQuery}${ratingQuery}`,
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, [selectedGenres, minRating]);

  const toggleGenre = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId],
    );
  };

  console.log(movies);
  console.log(genres);

  return (
    <div className="container mx-auto py-4 flex flex-col gap-4">
      <h3>Filter by genres</h3>
      {/* Your content here */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
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
          <RatingFilter onChange={setMinRating} value={minRating} />
        </div>
      </div>
      <div>
        {!movies || movies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <strong>{movie.title}</strong> (
                {movie.release_date?.slice(0, 4)})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
