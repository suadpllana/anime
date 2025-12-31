import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/ErrorBoundary";
import ThemeProvider from "./components/ThemeProvider";
import Header from "./components/Header";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import AnimeDetail from "./pages/AnimeDetail";
import GenreAnimes from "./pages/GenreAnimes";
import WatchlistPage from "./pages/WatchlistPage";
import "./styles/globals.css";
import "./Animes.scss";

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:search" element={<SearchResults />} />
          <Route path="/:search/:id" element={<AnimeDetail />} />
          <Route path="/genre/:genre" element={<GenreAnimes />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="*" element={<Navigate to="/" />} />
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
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
