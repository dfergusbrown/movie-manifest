import { useEffect, useState } from "react";
import { getAllMovies } from "../apiHelper";
const List = () => {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const result = await getAllMovies();
      setMovieList(result);
      console.log(result);
    };
    fetchMovies();
  }, []);
  if (movieList.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full h-full">
      {movieList.map((movie, idx) => {
        return (
          <div key={idx}>
            <div className="text-xl flex items-center gap-10 p-2">
              <img src={movie.poster_url} className="h-15" />
              <p>{movie.title}</p>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default List;
