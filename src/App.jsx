import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, createContext } from "react";
import Animes from "./Animes";
import GetAnimeBySearch from './GetAnimeBySearch';
import FilteredAnime from "./FilteredAnime";

export const filteredAnimeContext = createContext();

function App() {
  const [filteredAnime, setFilteredAnime] = useState([]);

  return (
    <filteredAnimeContext.Provider value={{ filteredAnime, setFilteredAnime }}>
      <Router>
        <Routes>

          <Route path="/anime" element={<Animes />} />
          <Route path="/" element={<Animes />} />
          <Route path="/anime/:search" element={<GetAnimeBySearch />} />
          <Route path="/anime/:search/:id" element={<FilteredAnime />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </filteredAnimeContext.Provider>
  );
}

export default App;
