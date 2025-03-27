import React, { useState, useEffect,createContext } from "react";
import "./Animes.scss";
import aniwatchtvImage from "./assets/aniwatchtv.png"
import { FaSearch } from "react-icons/fa";
import aniwatchLogo from "./assets/aniwatchLogo.png";
import {useNavigate} from "react-router-dom"
import { topSearchedAnime } from "./topSearchesAnimes";
export const searchContext = createContext()

const Animes = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate()


  function searchAnime(){
    navigate(`/anime/${search}`)
  }

  function enter(e){
    if(e.key === "Enter"){
      searchAnime()
    }
  }
 

  return (
    <searchContext.Provider value={{search}}>
    <div className="other-animes-container">
      <div className="search-anime">
        <img src={aniwatchLogo} alt="" />
        <div>
        <input onKeyDown={(e) => enter(e)} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search Anime... " name="" id="" />
        <button onClick={searchAnime}><FaSearch/></button>
        </div>
        
        <p>Top Searches : {topSearchedAnime.map(anime => (
          <span className="top-searches-anime" onClick={() => navigate(`/anime/${anime}`)}> {anime}, </span>
        ))}</p>
      
      </div>

      <div className="aniwatchtvImage">
        <img src={aniwatchtvImage} alt="" />
      
      </div>
    </div>
    </searchContext.Provider>
  );
};

export default Animes;