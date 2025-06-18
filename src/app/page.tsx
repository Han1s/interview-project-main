"use client";

import { useEffect, useState } from "react";
import RatingFilter from "@/components/RatingFilter";
import MovieCard from "@/components/MovieCard";
import MovieDetailsDialog from "@/components/MovieDetailsDialog";
import CountdownTimer from "@/components/Countdown";

// TODO: Refactor typescript
// TODO: Refactor fetching
// TODO: move movies, genres queries into a server component if possible
// TODO: Separate components into own files and folders
// TODO: Cache the genres

export default function Home() {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [minRating, setMinRating] = useState<string>("0");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [showNewMovies, setShowNewMovies] = useState(false);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [selectedGenres, minRating, page, showNewMovies]);

  const fetchMovies = () => {
    const genreQuery = selectedGenres.length
      ? `&with_genres=${selectedGenres.join(",")}`
      : "";
    const ratingQuery = `&vote_average.gte=${minRating}`;
    const pageQuery = `&page=${page}`;
    const sortQuery = showNewMovies ? "&sort_by=release_date.desc" : "";

    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}${genreQuery}${ratingQuery}${pageQuery}${sortQuery}&include_adult=false`,
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      });
  };

  const toggleGenre = (genreId: number) => {
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

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container mx-auto py-4 flex flex-col gap-4">
      {selectedMovie && (
        <MovieDetailsDialog onClose={closeModal} movieId={selectedMovie} />
      )}
      <h3 className={"text-xl font-bold"}>Filter by genres</h3>
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
        <h3 className={"text-xl font-bold"}>Filter by minimum rating</h3>
        <div>
          <RatingFilter onChange={handleRatingChange} value={minRating} />
        </div>
      </div>
      <div>
        <CountdownTimer
          action={fetchMovies}
          paused={!!selectedMovie}
          isActive={showNewMovies}
          setIsActive={setShowNewMovies}
        />
      </div>
      <div>
        {!movies || movies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.id}
                onClick={() => setSelectedMovie(movie.id)}
              />
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
