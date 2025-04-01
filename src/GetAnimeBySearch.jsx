import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import PopularAnimes from "./PopularAnimes";
import { useNavigate } from "react-router-dom";
import { filteredAnimeContext } from "./App";
import { FaPlay, FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

const GetAnimeBySearch = () => {
  let { search } = useParams();
  const [animeData, setAnimeData] = useState([]);
  const navigate = useNavigate();
  const { setFilteredAnime } = useContext(filteredAnimeContext);
  const [newAnimeData, setNewAnimeData] = useState();

  useEffect(() => {
    const getAnimeBySearch = async () => {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${search}&limit=6`
      );
      const data = await response.json();
      console.log(data);
      setAnimeData(data?.data);
    };
    getAnimeBySearch();
  }, [search]);

  function getAnimeById(id) {
    const filteredAnime = animeData.filter((anime) => anime.mal_id === id);
    setFilteredAnime(filteredAnime);
    console.log(filteredAnime);
    navigate(`/${search.toLowerCase().replace(/\s+/g, '-')}/${id}`);
  }

  function searchAnotherAnime() {
    if (newAnimeData) {
      navigate(`/${newAnimeData.toLowerCase().replace(/\s+/g, '-')}`);
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
        {animeData?.length === 0 ? <h3>No results found for "{search}"</h3>
        :     <h3>Search results for "{search}"</h3>}
    
        <p className="go-back" onClick={() => navigate("/")}><IoMdArrowRoundBack/>Go back</p>
        <input onKeyDown={(e) => searchByEnter(e)} className="new-anime" onChange={(e) => setNewAnimeData(e.target.value)} type="text" placeholder="Search for another anime" />
        <button className="new-anime-search-button" onClick={searchAnotherAnime}><FaSearch/></button>
        <div className="anime-list">
          {animeData?.length > 0 &&
            animeData?.map((anime) => (
              <div
                onClick={() => getAnimeById(anime.mal_id)}
                className="anime-card"
                key={anime.id}
              >
                <p className="play-button"><FaPlay/></p>
                <img src={anime.images.jpg.large_image_url} alt="" />
          
                <div className="anime-info">
                  <h4>{anime.title_english || anime.title_japanese}</h4>

                  <div className="more-info">
                    <p>{anime.score || "N/A"}⭐</p>
                    <p className="type">{anime.type}</p>
                  </div>
                  <p>{anime?.synopsis?.slice(0, 129)}...</p>
                  <div className="anime-details">
                    <p>Japanese: {anime.title_japanese}</p>
                    <p>
                      Duration:{" "}
                      { anime.duration}
                    </p>
                    <p>Aired: {anime?.aired?.string}</p>
                    <p>Status: {anime.status}</p>
                    <p>
                      Genres:{" "}
                      {anime.genres.map((genre) => (
                        <span> {genre.name} </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="popular-animes">
        <PopularAnimes />
      </div>
    </div>
  
  );
};

export default GetAnimeBySearch;