import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { filteredAnimeContext, watchlistContext } from "./App";
import { FaPlay, FaPlus } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";

const FilteredAnime = () => {
  const navigate = useNavigate();
  const { filteredAnime, setFilteredAnime } = useContext(filteredAnimeContext);
  const { watchlist, setWatchlist } = useContext(watchlistContext);
  const [fullOverview, setFullOverview] = useState(false);
  const { search, id } = useParams();
  const [showTrailer, setShowTrailer] = useState(false);
  const [recommendedAnimes, setRecommendedAnimes] = useState([]);
  const [newsAnimes, setNewsAnimes] = useState([]);

  useEffect(() => {
    async function getAnimeDetails() {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await response.json();
        setFilteredAnime([data.data]); 
      } catch (error) {
        console.error("Error fetching anime details:", error);
        toast.error("Failed to load anime details");
      }
    }

    async function getRecommendedAnimes() {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);
        const data = await response.json();
        setRecommendedAnimes(data?.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    }

    async function getNewsPerAnime() {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/news`);
        const data = await response.json();
        setNewsAnimes(data?.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }

    getAnimeDetails();
    getRecommendedAnimes();
    getNewsPerAnime();
  }, [id, setFilteredAnime]); 

  useEffect(() => {
    const storedAnime = localStorage.getItem("filteredAnime");
    if (storedAnime && !filteredAnime.length) {
      setFilteredAnime(JSON.parse(storedAnime));
    }
  }, [filteredAnime, setFilteredAnime]);

  useEffect(() => {
    if (filteredAnime && filteredAnime.length > 0) {
      localStorage.setItem("filteredAnime", JSON.stringify(filteredAnime));
    }
  }, [filteredAnime]);

  function saveToWatchlist() {
    const alreadyWatchlisted = watchlist.some(
      (watchlistedAnime) => watchlistedAnime.mal_id === anime.mal_id
    );
    if (alreadyWatchlisted) {
      toast.error("Anime is already in watchlist");
      return;
    }
    setWatchlist((prev) => [...prev, anime]);
    toast.success("Anime added to watchlist");
  }

  async function getRecommendedAnimeById(malId, title) {
    try {
      navigate(`/${encodeURIComponent(title.replace(/\s+/g, "-"))}/${malId}`);
    } catch (error) {
      console.error("Error navigating to recommended anime:", error);
      toast.error("Failed to load recommended anime");
    }
  }

  const anime = filteredAnime[0];

  return (
    <div className="filtered-anime">
      <div className="filtered-anime-container">
        <div className="important-info">
          <img src={anime?.images?.jpg?.large_image_url} alt="" />
          <div>
            <h1>{anime?.title_english || anime?.title_japanese}</h1>
            <p>
              {anime?.type} <GoDotFill /> {anime?.duration} <GoDotFill /> {anime?.score}⭐ <GoDotFill />{" "}
              {anime?.status} <br /> <br />
              {anime?.aired?.string} <GoDotFill />{" "}
              {anime?.genres?.map((genre) => (
                <span key={genre?.mal_id}>{genre?.name} </span>
              ))}
            </p>
            <div className="buttons">
              <button className="watch-now" onClick={() => setShowTrailer(true)}>
                <FaPlay /> Watch trailer
              </button>
              <button className="add-to-list" onClick={saveToWatchlist}>
                <FaPlus /> Add to watchlist
              </button>
            </div>
            {anime?.synopsis?.length > 300 ? (
              <p>
                {fullOverview ? anime?.synopsis : anime?.synopsis.slice(0, 300)}
                <button className="synopsis-shower" onClick={() => setFullOverview((prev) => !prev)}>
                  {fullOverview ? "Hide" : "Read more"}
                </button>
              </p>
            ) : (
              <p>{anime?.synopsis}</p>
            )}
            <p>
              AniWatch is the best site to watch {anime?.title_english} SUB online, or you can even watch{" "}
              {anime?.title_english} DUB in HD quality. You can also find Studio Pierrot anime on AniWatch
              website.
            </p>
            <p className="go-back" onClick={() => navigate(-1)}>
              <IoMdArrowRoundBack /> Go Back
            </p>
          </div>
        </div>

        <div className="side-info">
          <h4>News for {anime?.title_english || anime?.title_japanese}</h4>
          {newsAnimes?.map((news) => (
            <div key={news.mal_id}>
              
              <img src={news?.images?.jpg?.image_url} alt="" />
              <p>
                {news?.title} <br />
                <a target="_blank" href={news?.url} rel="noopener noreferrer">
                  Read more
                </a>
              </p>
            </div>
          ))}
        </div>
        {showTrailer && (
          <div className="iframe-container" onClick={() => setShowTrailer(false)}>
            <span className="remove-trailer" onClick={() => setShowTrailer(false)}>
              X
            </span>
            <iframe
              className="iframe-trailer"
              src={`https://www.youtube.com/embed/${anime?.trailer?.youtube_id}?autoplay=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
      <h2>Recommended from {anime?.title_english}</h2>
      <div className="recommended-anime">
        {recommendedAnimes?.map((anime) => (
          <div
            onClick={() => getRecommendedAnimeById(anime.entry.mal_id, anime.entry.title)}
            key={anime.entry.mal_id}
          >
            <img src={anime?.entry?.images?.jpg?.image_url} alt={anime.entry.title} />
            <p>{anime?.entry?.title}</p>
          </div>
        ))}
      </div>
      {recommendedAnimes.length === 0 && <h2>Nothing found!</h2>}
    </div>
  );
};

export default FilteredAnime;