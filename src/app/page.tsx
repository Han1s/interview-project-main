
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
        const newMovies = [];
        
          const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5118448f0df78266f8f992a2967ddfd1&include_adult=false`);
          const data = response.json();
          //@ts-ignore
          setMovies(data.results);
    };
    
    fetchMovies();
  }, []);

  return (
    <div style={{ 
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "#111",
      minHeight: "100vh",
      color: "white"
    }}>
      
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "30px",
        width: "100%" 
      }}>
        {movies && movies.map((movie, index) => (
          <div 
            key={movie.id || index} 
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: "#222",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
            }}
          >
            <h2 style={{ marginBottom: "15px" }}>{movie.title}</h2>
            {movie.backdrop_path && (
              <div style={{ position: "relative", height: "250px", width: "100%" }}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                  
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}