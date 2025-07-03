import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import PopularAnimes from "./PopularAnimes";
import { useNavigate } from "react-router-dom";
import { filteredAnimeContext, watchlistContext } from "./App";
import { FaPlay, FaSearch } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import Watchlist from "./Watchlist";

const GetAnimeBySearch = () => {
  let { search } = useParams();
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setFilteredAnime } = useContext(filteredAnimeContext);
  const [newAnimeData, setNewAnimeData] = useState("");
  const {watchlist} = useContext(watchlistContext)

  const displaySearchTerm = search.replace(/-/g, ' ');

  useEffect(() => {
    const getAnimeBySearch = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${search.replace(/-/g, ' ')}&limit=6`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch anime data");
        }
        const data = await response.json();
        setAnimeData(data?.data || []);
        console.log(data.data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getAnimeBySearch();
  }, [search]);

  function getAnimeById(id) {
    const filteredAnime = animeData.filter((anime) => anime.mal_id === id);
    setFilteredAnime(filteredAnime);
    const hyphenatedSearch = search.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${hyphenatedSearch}/${id}`);
  }

  function searchAnotherAnime() {
    if (newAnimeData) {
      const hyphenatedSearch = newAnimeData.toLowerCase().replace(/\s+/g, '-');
      navigate(`/${hyphenatedSearch}`);
    }
  }

  function searchByEnter(e) {
    if (e.key === "Enter") {
      searchAnotherAnime();
    }
  }

  return (
    <div className="anime-page-container">
      <div className="get-anime-by-search">
        {loading ? (
          <h3>Loading...</h3>
        ) : error ? (
          <h3>Error: {error}</h3>
        ) : animeData?.length === 0 ? (
          <h3>No results found for "{displaySearchTerm}"</h3>
        ) : (
          <h3>Search results for "{displaySearchTerm}"</h3>
        )}
        <p className="go-back" onClick={() => navigate("/")}>
          <IoMdArrowRoundBack /> Go back
        </p>
        <input
          onKeyDown={(e) => searchByEnter(e)}
          className="new-anime"
          onChange={(e) => setNewAnimeData(e.target.value)}
          type="text"
          placeholder="Search for another anime"
          value={newAnimeData}
        />
        <button className="new-anime-search-button" onClick={searchAnotherAnime}>
          <FaSearch />
        </button>
        <div className="anime-list">
          {animeData?.length > 0 &&
            animeData.map((anime) => (
              <div
                onClick={() => getAnimeById(anime.mal_id)}
                className="anime-card"
                key={anime.mal_id}
              >
                <p className="play-button">
                  <FaPlay />
                </p>
                <img src={anime.images.jpg.large_image_url} alt={anime.title_english || anime.title_japanese} />
                <div className="anime-info">
                  <h4>{anime.title_english || anime.title_japanese}</h4>
                  <div className="more-info">
                    <p>{anime.score || "N/A"}⭐</p>
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
        <Watchlist/>
      </div>
      <div className="popular-animes">
        <PopularAnimes />
      </div>
    </div>
  );
};

export default GetAnimeBySearch;