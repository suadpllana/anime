import React from 'react'
import {watchlistContext, filteredAnimeContext} from "./App"
import {useContext, useEffect} from "react"
import { useNavigate,useParams } from "react-router-dom";
import { FaPlay, FaSearch ,FaRegTrashAlt} from "react-icons/fa";
import "./Animes.scss"
import { toast } from 'react-toastify';

const Watchlist = () => {
      let { search } = useParams();
      let {genre} = useParams()
    const { watchlist , setWatchlist} = useContext(watchlistContext);
    const {setFilteredAnime} = useContext(filteredAnimeContext)
  const navigate = useNavigate();


  useEffect(() => {
  } , [])

  function getAnimeById(id) {
        

    const filteredAnime = watchlist.filter((anime) => anime.mal_id === id);
    setFilteredAnime(filteredAnime);
      search == undefined ? search = filteredAnime[0].title_english  : search
    const hyphenatedSearch = search?.toLowerCase().replace(/\s+/g, '-') || genre?.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${hyphenatedSearch}/${id}`);
  }
  function removeFromWatchlist(e, id) {
    e.stopPropagation()
    const filteredWatchlist = watchlist.filter(anime => anime.mal_id !== id);
    setWatchlist(filteredWatchlist)
    toast.success("Anime deleted successfully")
  }
    
  return (
    <div className="watchlist">

    <div className="get-anime-by-search">
    <div className="watchlist-container">
      <h2 style={{textAlign: "center"}}>Your Watchlist</h2>
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
    </div>
    </div>

  )
}

export default Watchlist
