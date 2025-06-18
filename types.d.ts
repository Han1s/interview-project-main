type Movie = {
  release_date: string;
  overview: string;
  title: string;
  genres: { id: number; name: string }[];
  id: number;
  poster_path: string;
  vote_average: number;
};

type Genre = {
  id: number;
  name: string;
};
