import React, { useEffect, useState } from "react";

interface MovieDetailsDialog {
  onClose: () => void;
  movieId: number;
}

const MovieDetailsDialog = ({ onClose, movieId }: MovieDetailsDialog) => {
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [similar, setSimilar] = useState<Movie[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,
      ).then((res) => res.json()),
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${movieId}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,
      ).then((res) => res.json()),
    ]).then((res) => {
      setMovieDetails(res[0]);
      setSimilar(res[1].results);
    });
  }, [movieId]);

  return (
    <dialog id="movie_modal" className="modal modal-open">
      <div className="modal-box w-11/12 max-w-3xl">
        {!movieDetails && <p>Loading...</p>}
        {movieDetails && (
          <>
            <h3 className="font-bold text-xl">{movieDetails.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              Release Date: {movieDetails.release_date}
            </p>
            <div className="mb-2">
              <span className="font-semibold">Genres: </span>
              {movieDetails.genres.map((g) => g.name).join(", ")}
            </div>
            <p className="mb-4">{movieDetails.overview}</p>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Similar Movies:</h4>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {similar.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No similar movies found.
                  </p>
                ) : (
                  similar.map((m) => (
                    <div key={m.id} className="text-sm">
                      🎬 {m.title} ({m.release_date?.slice(0, 4)})
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default MovieDetailsDialog;
