import React, { useState, useEffect, createContext } from "react";
import "./Animes.scss";
import aniwatchtvImage from "./assets/aniwatchtv.png";
import aniwatchLogo from "./assets/aniwatchLogo.png";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { topSearchedAnime } from "./topSearchesAnimes";

export const searchContext = createContext();

const Animes = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function searchAnime() {
    if (search.trim()) {
      const hyphenatedSearch = search.trim().toLowerCase().replace(/\s+/g, '-');
      navigate(`/anime/${hyphenatedSearch}`);
      setSearch(""); 
    }
  }

  function enter(e) {
    if (e.key === "Enter") {
      searchAnime();
    }
  }

  function clearSearch() {
    setSearch("");
  }

  return (
    <searchContext.Provider value={{ search }}>
      <div className="other-animes-container">
        <div className="search-anime">
          <img src={aniwatchLogo} alt="Aniwatch Logo" />
          <div className="search-bar">
            <input
              onKeyDown={(e) => enter(e)}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              value={search}
              placeholder="Search Anime..."
              aria-label="Search for anime"
              id="anime-search"
            />
            {search && (
              <button
                className="clear-search-button"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
            <button onClick={searchAnime} aria-label="Search anime">
              <FaSearch />
            </button>
          </div>
          <p>
            Top Searches:{" "}
            {topSearchedAnime.map((anime, index) => (
              <span
                key={index}
                className="top-searches-anime"
                onClick={() =>
                  navigate(`/anime/${anime.toLowerCase().replace(/\s+/g, '-')}`)
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate(`/anime/${anime.toLowerCase().replace(/\s+/g, '-')}`);
                  }
                }}
              >
                {anime}
                {index < topSearchedAnime.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
        <div className="aniwatchtvImage">
          <img src={aniwatchtvImage} alt="Aniwatch TV Banner" />
        </div>
      </div>
    </searchContext.Provider>
  );
};

export default Animes;