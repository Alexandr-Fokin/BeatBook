import { useEffect, useState } from "react";
import "./App.css";
import SearchItem from "./components/searchItem/SearchItem";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);

  async function getToken() {
    const clientId = "123cf0a0417247469d4fcbb8b7ec89c1";
    const clientSecret = "5301e8e323874ec3a88bfae30b253c7c";

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token; // вот его потом используем в других запросах
  }

  async function searchAlbumsData() {
    setLoading(true);

    const token = await getToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchValue
      )}&type=album&limit=20`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await response.json();
    console.log(data.albums.items);
    setSearchData(data.albums.items);
    setLoading(false);
  }

  const searchAlbums = (e) => {
    e.preventDefault();
    searchAlbumsData();
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
          {searchData.map((album) => (
            <SearchItem key={album.id} data={album}></SearchItem>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
