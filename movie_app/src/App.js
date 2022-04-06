import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  //asyn를 쓰지 않을때
  // fetch(
  //   `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
  // )
  //   .then((res) => res.json())
  //   .then((json) => {
  //     setMovies(json.data.movies);
  //     setLoading(false);
  //   });
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((item) => (
            <div key={item.id}>
              <img src={item.medium_cover_image}></img>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
              <ul>
                {item.genres.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
