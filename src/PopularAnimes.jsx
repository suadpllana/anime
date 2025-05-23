import React, { useState, useEffect, useContext } from "react";
import "./Animes.scss";
import { filteredAnimeContext } from './App';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const PopularAnimes = () => {
  const [popularAnimes, setPopularAnimes] = useState([]);
  const { setFilteredAnime } = useContext(filteredAnimeContext);
  const navigate = useNavigate();
  const { search, id } = useParams();

  useEffect(() => {
    const storedAnimes = localStorage.getItem("popularAnimes");

    let parsedAnimes = [];
    if (storedAnimes) {
      try {
        parsedAnimes = JSON.parse(storedAnimes);
      } catch (error) {
        console.error("Error parsing storedAnimes:", error);
      }
    }

    if (parsedAnimes.length === 0) {
      async function getPopularAnimes() {
        const response = await fetch(`https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=1`);
        const data = await response.json();
        setPopularAnimes(data?.data.slice(0, 10));
        localStorage.setItem("popularAnimes", JSON.stringify(data?.data));
      }
      getPopularAnimes();
    } else {
      setPopularAnimes(parsedAnimes);
    }
  }, []);

  function getAnimeById(id) {
    const anime = popularAnimes.filter(anime => anime.mal_id === id);
    setFilteredAnime(anime);
    navigate(`/anime/${search.toLowerCase().replace(/\s+/g, '-')}/${id}`);
  }

  return (
    <>
      <h1>Popular Animes</h1>
      <div className="popular-anime-container">
        {popularAnimes?.length > 0 &&
          popularAnimes.map((anime) => (
            <div onClick={() => getAnimeById(anime.mal_id)} className="anime-card" key={anime.mal_id}>
              <img src={anime.images.jpg.small_image_url} alt={anime.title_english} />
              <p>{anime.title_english ? anime.title_english : anime.title}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default PopularAnimes;
