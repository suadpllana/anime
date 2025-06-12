import React from 'react'
import {watchlistContext, filteredAnimeContext} from "./App"
import {useContext} from "react"
import { useNavigate,useParams } from "react-router-dom";
import { FaPlay, FaSearch ,FaRegTrashAlt} from "react-icons/fa";
import "./Animes.scss"
import { toast } from 'react-toastify';

const Watchlist = () => {
      let { search } = useParams();
    const { watchlist , setWatchlist} = useContext(watchlistContext);
    const {setFilteredAnime} = useContext(filteredAnimeContext)
  const navigate = useNavigate();

  function getAnimeById(id) {
    const filteredAnime = watchlist.filter((anime) => anime.mal_id === id);
    setFilteredAnime(filteredAnime);
    const hyphenatedSearch = search.toLowerCase().replace(/\s+/g, '-');
    navigate(`/anime/${hyphenatedSearch}/${id}`);
  }
  function removeFromWatchlist(e, id) {
    e.stopPropagation()
    const filteredWatchlist = watchlist.filter(anime => anime.mal_id !== id);
    setWatchlist(filteredWatchlist)
    toast.success("Anime deleted successfully")
  }
    
  return (
    <div className="watchlist-container">
      <h2>Your Watchlist</h2>
          <div className="anime-list">
               {watchlist?.length > 0 &&
                 watchlist.map((anime) => (
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
                         <FaRegTrashAlt onClick={(e) => removeFromWatchlist(e, anime.mal_id)} className="removeFromWatchlist"  title="Remove from watchlist
                        "/>
                       </div>
                     </div>
                        
                   </div>
                 ))}
             </div>
    </div>
  )
}

export default Watchlist
