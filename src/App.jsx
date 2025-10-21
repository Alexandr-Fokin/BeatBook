import { useState } from "react";
import "./App.css";
import SearchItem from "./components/searchItem/SearchItem";
import { searchAlbumsData } from "./spotifyApi";
import { DataStore } from "./dataStore";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState("liked");
  const searchAlbums = async (e) => {
    e.preventDefault();
    setPage("search");
    setLoading(true);
    setSearchData(await searchAlbumsData(searchValue));
    setLoading(false);
  };

  return (
    <>
      <div className="main">
        <div className="search">
          <form onSubmit={searchAlbums}>
            <input
              type="text"
              className="search__input border border-gray-400"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <input type="submit" value="Поиск" />
          </form>
        </div>
        <div className="main-box flex flex-col gap-[15px]">
          {loading && <div>Загрузка</div>}
          {page == "search" && (
            <>
              <h2>Поиск по запросу: {searchValue}</h2>
              <div className="albums">
                {searchData.map((album) => (
                  <SearchItem key={album.id} data={album}></SearchItem>
                ))}
              </div>
            </>
          )}
          {page == "liked" && (
            <>
              <h2>Любимые треки</h2>
              <div className="albums">
                {DataStore.getUserData().albums.map((album) => (
                  <SearchItem key={album.id} data={album}></SearchItem>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <nav className="menu__box">
        <button
          className={page == "liked" ? "active" : ""}
          onClick={() => setPage("liked")}
        >
          Любимые альбомы
        </button>
        <button
          className={page == "search" ? "active" : ""}
          onClick={() => setPage("search")}
        >
          Поиск
        </button>
      </nav>
    </>
  );
}

export default App;
