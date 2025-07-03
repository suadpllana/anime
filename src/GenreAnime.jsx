import React from "react";
import { useState, useEffect, useContext } from "react";
import { filteredAnimeContext } from "./App";
import { useSearchParams, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Watchlist from "./Watchlist";
import PopularAnimes from "./PopularAnimes";
import { FaPlay, FaSearch } from "react-icons/fa";

const GenreAnime = () => {
  const [searchParams] = useSearchParams();
  const { setFilteredAnime } = useContext(filteredAnimeContext);
  const type = searchParams.get("type");
  const [filteredAnimes, setFilteredAnimes] = useState([]);
  const navigate = useNavigate();
  const filter = searchParams.get("filter");

  useEffect(() => {
    async function fetchAnimeGenre() {
      let url = "https://api.jikan.moe/v4/top/anime?";

      if (type) {
        url += `type=${type}`;
        if (filter) url += `&filter=${filter}`;
      } else if (filter) {
        url += `filter=${filter}`;
      }

      const response = await fetch(url);

      const data = await response.json();
      setFilteredAnimes(data?.data);
      console.log(data);
      console.log(type);
    }
    fetchAnimeGenre();
  }, []);
  function getAnimeById(id) {
    const filteredAnime = filteredAnimes.filter((anime) => anime.mal_id === id);
    setFilteredAnime(filteredAnime);
    const hyphenatedSearch = (
      filteredAnime[0].title_english || filteredAnime[0].title_japanese
    )
      .toLowerCase()
      .replace(/\s+/g, "-");
    console.log(hyphenatedSearch);
    navigate(`/${hyphenatedSearch}/${id}`);
  }

  const filterMap = {
    bypopularity: "Most Popular",
    favorite: "Most Favorited",
    airing: "Top Airing",
    upcoming: "Upcoming"
  };

  return (
    <div className="anime-page-container">
      <div className="get-anime-by-search">
        {filteredAnimes?.length === 0 ? (
          <h3>No results found for "{type}"</h3>
        ) : (
          <h1 style={{ textAlign: "center", color: "#ffdd95" }}>
            {type
              ? `${type.charAt(0).toUpperCase() + type.slice(1)} Animes`
              : filter
              ? `${filterMap[filter] || filter} Animes`
              : "Anime List"}
          </h1>
        )}
        <p className="go-back" onClick={() => navigate("/")}>
          <IoMdArrowRoundBack /> Go back
        </p>

        <div className="anime-list">
          {filteredAnimes?.length > 0 &&
            filteredAnimes.map((anime) => (
              <div
                onClick={() => getAnimeById(anime.mal_id)}
                className="anime-card"
                key={Math.random()}
              >
                <p className="play-button">
                  <FaPlay />
                </p>
                <img
                  src={anime?.images.jpg.large_image_url}
                  alt={anime?.title_english || anime.title_japanese}
                />
                <div className="anime-info">
                  <h4>{anime?.title_english || anime.title_japanese}</h4>
                  <div className="more-info">
                    <p>{anime?.score || "N/A"}⭐</p>
                    <p className="type">{anime.type}</p>
                  </div>
                  <p>{anime?.synopsis?.slice(0, 129)}...</p>
                  <div className="anime-details">
                    <p>Japanese: {anime.title_japanese}</p>
                    <p>Duration: {anime.duration}</p>
                    <p>Aired: {anime?.aired?.string}</p>
                    <p>Status: {anime.status}</p>
                    <p>
                      Genres:{" "}
                      {anime.genres.map((genre) => (
                        <span key={genre.mal_id}> {genre.name} </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <Watchlist />
      </div>
      <div className="popular-animes">
        <PopularAnimes />
      </div>
    </div>
  );
};

export default GenreAnime;
