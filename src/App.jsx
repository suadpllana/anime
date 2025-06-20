import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {useState , createContext, useEffect} from "react"
import Animes from "./Animes";
import GetAnimeBySearch from './GetAnimeBySearch';
import FilteredAnime from "./FilteredAnime";
import {ToastContainer} from "react-toastify"
import GenreAnime from "./GenreAnime";

export const filteredAnimeContext = createContext();
export const watchlistContext = createContext()

function App() {
  const [filteredAnime, setFilteredAnime] = useState([]);
const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("anime-watchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

    useEffect(() => {
    localStorage.setItem("anime-watchlist", JSON.stringify(watchlist));
  }, [watchlist]);
  return (
    <watchlistContext.Provider value={{watchlist, setWatchlist}}>
    <filteredAnimeContext.Provider value={{filteredAnime, setFilteredAnime}}>
       <Router>
        <Routes>

        <Route path="/anime" element={<Animes />} />
              <Route path="/" element={<Animes />} />
              <Route path="*" element={<Navigate to="/anime" />} />
           <Route path="/anime/:search" element={<GetAnimeBySearch />} />
           <Route path="/anime/:search/:id" element={<FilteredAnime />} />
           <Route path="/anime/genre/:genre" element={<GenreAnime/>} />
        </Routes>
      </Router>
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
