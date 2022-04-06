import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Detail() {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({
    title: "",
    description_intro: "",
    image: "",
  });
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    setDetails({
      ...details,
      title: json.data.movie.title,
      description_intro: json.data.movie.description_intro,
      image: json.data.movie.large_cover_image,
    });

    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={details.image} alt={details.title}></img>
          <h1>{details.title}</h1>
          <p>{details.description_intro}</p>
        </div>
      )}
    </div>
  );
}
export default Detail;
