import { useState } from "react";
import SearchItemAlbum from "./searchItemAlbum/SearchItemAlbum";
import SearchItemTrack from "./searchItemTrack/SearchItemTrack";
import styles from "./Search.module.css";

export default function Search({ data }) {
  const [searchType, setSearchType] = useState("all");

  console.log("search data", data);

  if (data.length == 0) {
    return <div className={styles.search}></div>;
  }
  if (data.error) {
    return (
      <div className={styles.search}>
        <div className="search__error_message">{data.error.message}</div>
      </div>
    );
  }
  if (data.albums.items.length == 0 && data.tracks.items.length == 0) {
    return (
      <div className="search">
        <div className="search__not_found_message">Ничего не найдено</div>
      </div>
    );
  }
  return (
    <div className={styles.search}>
      <div className={styles.search__types}>
        <a
          className={`${styles.search__type} ${searchType == "all" ? styles.active : ""}`}
          onClick={() => setSearchType("all")}
        >
          Все
        </a>
        <a
          className={`${styles.search__type} ${searchType == "albums" ? styles.active : ""}`}
          onClick={() => setSearchType("albums")}
        >
          Альбомы
        </a>
        <a
          className={`${styles.search__type} ${searchType == "tracks" ? styles.active : ""}`}
          onClick={() => setSearchType("tracks")}
        >
          Треки
        </a>
      </div>

      {searchType == "all" && (
        <div className={styles.search__type_all}>
          <div className="albums flex flex-col">
            <a onClick={() => setSearchType("albums")} className={styles.search__title_link}>
              Альбомы
            </a>
            <div className={`${styles.search__albums_items} flex flex-col`}>
              {data.albums.items.map((album, i) => {
                if (i < Math.floor(document.querySelector(".main-box").clientWidth / 200)) {
                  return <SearchItemAlbum key={album.id} data={album}></SearchItemAlbum>;
                }
              })}
            </div>
          </div>
          <div className="albums flex flex-col">
            <a onClick={() => setSearchType("tracks")} className={styles.search__title_link}>
              Треки
            </a>
            {data.tracks.items.map((track, i) => {
              if (i < 5) {
                return <SearchItemTrack key={track.id} data={track}></SearchItemTrack>;
              }
            })}
          </div>
        </div>
      )}
      {searchType == "albums" && (
        <div className="albums flex flex-col">
          <h3 className="default_title_md text-theme-black ml-[10px] mb-[5px]">Альбомы</h3>
          <div className={`${styles.search__albums_items} flex flex-col`}>
            {data.albums.items.map((album) => (
              <SearchItemAlbum key={album.id} data={album}></SearchItemAlbum>
            ))}
          </div>
        </div>
      )}
      {searchType == "tracks" && (
        <div className="albums flex flex-col">
          <h3 className="default_title_md text-theme-black ml-[10px] mb-[5px]">Треки</h3>
          {data.tracks.items.map((track) => (
            <SearchItemTrack key={track.id} data={track}></SearchItemTrack>
          ))}
        </div>
      )}
    </div>
  );
}
