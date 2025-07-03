import {
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import Animes from "./Animes";
import GetAnimeBySearch from "./GetAnimeBySearch";
import FilteredAnime from "./FilteredAnime";
import { ToastContainer } from "react-toastify";
import GenreAnime from "./GenreAnime";
import Watchlist from "./Watchlist";
import "./Animes.scss";

export const filteredAnimeContext = createContext();
export const watchlistContext = createContext();

function App() {
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("anime-watchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("anime-watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  return (
    <watchlistContext.Provider value={{ watchlist, setWatchlist }}>
      <filteredAnimeContext.Provider value={{ filteredAnime, setFilteredAnime }}>
        <Routes>
          <Route path="/" element={<Animes />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/:search" element={<GetAnimeBySearch />} />
          <Route path="/:search/:id" element={<FilteredAnime />} />
          <Route path="/genre/:genre" element={<GenreAnime />} />
          <Route
            path="/watchlist"
            element={
              <div>
                <p
                  onClick={() => navigate(-1)}
                  style={{ marginLeft: "20px", cursor: "pointer",  }}
                >
                  ← Go back
                </p>
                <Watchlist />
              </div>
            }
          />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </filteredAnimeContext.Provider>
    </watchlistContext.Provider>
  );
}

export default App;
