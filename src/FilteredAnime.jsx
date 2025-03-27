import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { filteredAnimeContext } from './App';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPlus } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoMdArrowRoundBack } from "react-icons/io";

const FilteredAnime = () => {

    const navigate = useNavigate();
    const { filteredAnime } = useContext(filteredAnimeContext);
    const [fullOverview, setFullOverview] = useState(false);
    const {search} = useParams()

  
    return (
    <div className="filtered-anime-container">
        <div className="important-info">
            <img src={filteredAnime[0]?.images.jpg.large_image_url} alt="" />
            <div>
            <h1>{filteredAnime[0]?.title_english || filteredAnime[0]?.title_japanese}</h1>
            <p>{filteredAnime[0]?.type} <GoDotFill/>   {filteredAnime[0]?.duration}</p>
            <button className="watch-now"><FaPlay/> Watch now</button>
            <button className="add-to-list"><FaPlus/> Add to list</button>
         
            {filteredAnime[0]?.synopsis.length > 300 ? (
                  <p>
                    {fullOverview
                      ? filteredAnime[0]?.synopsis
                      : filteredAnime[0]?.synopsis.slice(0, 300)}
                    {" "}<button className="synopsis-shower" onClick={() => setFullOverview(prev => !prev)}>{fullOverview ? "Hide" : "Read more"}</button>{" "}
                  </p>
                ) : (
                  <p>{filteredAnime[0]?.synopsis}</p>
                )}

            <p>AniWatch is the best site to watch {filteredAnime[0]?.title_english} SUB online, or you can even watch {filteredAnime[0]?.title_english} DUB in HD quality. You can also find Studio Pierrot anime on AniWatch website.</p>
                <p className="go-back" onClick={() =>  navigate(`/anime/${search}`)}> <IoMdArrowRoundBack/> Go Back</p>
            
            </div>
      
        </div>

        <div className="side-info">
        <p>Japanese: {filteredAnime[0]?.title_japanese}</p>
        <p>Aired: {filteredAnime[0]?.aired?.string}</p>
         <p>Duration:{filteredAnime[0]?.type === "TV"? `${filteredAnime[0]?.duration} per episode`: filteredAnime[0]?.duration}</p>
         <p>Status: {filteredAnime[0]?.status}</p>
         <p>Rating: {filteredAnime[0]?.score}⭐</p>
         <p> Genres: {filteredAnime[0]?.genres.map((genre) => (<span> {genre.name} </span>))}</p>
        </div>
    </div>
  )
}

export default FilteredAnime