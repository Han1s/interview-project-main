"use client";

import { useEffect, useState } from "react";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Home() {
  const [movies, setMovies] = useState<any[] | null>(null);
  const [genres, setGenres] = useState<any[] | null>(null);

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

  console.log(movies);
  console.log(genres);

  return (
    <div className="container mx-auto py-4">
      {/* Your content here */}
      <p>Hello world</p>
    </div>
  );
}
