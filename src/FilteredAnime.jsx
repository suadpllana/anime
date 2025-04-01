import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { filteredAnimeContext } from "./App";
import { FaPlay, FaPlus } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoMdArrowRoundBack } from "react-icons/io";

const FilteredAnime = () => {
  const navigate = useNavigate();
  const { filteredAnime, setFilteredAnime } = useContext(filteredAnimeContext);
  const [fullOverview, setFullOverview] = useState(false);
  const { search, id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!filteredAnime.length || filteredAnime[0]?.mal_id !== parseInt(id)) {

      const fetchFilteredAnime = async () => {
        setLoading(true);
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await response.json();
        setFilteredAnime([data.data]); 
        setLoading(false);
      };

      fetchFilteredAnime();
    } else {
      setLoading(false);
    }
  }, [id, filteredAnime, setFilteredAnime]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const anime = filteredAnime[0];

  return (
    <div className="filtered-anime-container">
      <div className="important-info">
        <img src={anime?.images.jpg.large_image_url} alt="" />
        <div>
          <h1>{anime?.title_english || anime?.title_japanese}</h1>
          <p>{anime?.type} <GoDotFill /> {anime?.duration}</p>
          <button className="watch-now"><FaPlay /> Watch now</button>
          <button className="add-to-list"><FaPlus /> Add to list</button>
          {anime?.synopsis?.length > 300 ? (
            <p>
              {fullOverview
                ? anime?.synopsis
                : anime?.synopsis.slice(0, 300)}
              <button className="synopsis-shower" onClick={() => setFullOverview(prev => !prev)}>
                {fullOverview ? "Hide" : "Read more"}
              </button>
            </p>
          ) : (
            <p>{anime?.synopsis}</p>
          )}
          <p>AniWatch is the best site to watch {anime?.title_english} SUB online, or you can even watch {anime?.title_english} DUB in HD quality. You can also find Studio Pierrot anime on AniWatch website.</p>
          <p className="go-back" onClick={() => navigate(`/anime/${search.toLowerCase().replace(/\s+/g, '-')}`)}>
            <IoMdArrowRoundBack /> Go Back
          </p>
        </div>
      </div>

      <div className="side-info">
        <p>Japanese: {anime?.title_japanese}</p>
        <p>Aired: {anime?.aired?.string}</p>
        <p>Duration: {anime?.type === "TV" ? `${anime?.duration} per episode` : anime?.duration}</p>
        <p>Status: {anime?.status}</p>
        <p>Rating: {anime?.score}⭐</p>
        <p>Genres: {anime?.genres.map((genre) => (<span key={genre.name}>{genre.name}</span>))}</p>
      </div>
    </div>
  );
};

export default FilteredAnime;
