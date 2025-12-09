import SearchItemAlbum from "./searchItemAlbum/SearchItemAlbum";
import SearchItemTrack from "./searchItemTrack/SearchItemTrack";
import styles from "./Search.module.css";
import { useLoaderData, useSearchParams } from "react-router-dom";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchType = searchParams.get("type");

  const searchData = useLoaderData();
  console.log(searchData);

  const changeSearchType = (type) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("type", type);
    setSearchParams(newParams);
  };

  console.log("search data", searchData);

  if (!searchData) {
    return <div className={styles.search}></div>;
  }
  if (searchData.error) {
    return (
      <div className={styles.search}>
        <div className="search__error_message">{searchData.error.message}</div>
      </div>
    );
  }
  if (searchData.albums.items.length == 0 && searchData.tracks.items.length == 0) {
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
          onClick={() => changeSearchType("all")}
        >
          Все
        </a>
        <a
          className={`${styles.search__type} ${searchType == "albums" ? styles.active : ""}`}
          onClick={() => changeSearchType("albums")}
        >
          Альбомы
        </a>
        <a
          className={`${styles.search__type} ${searchType == "tracks" ? styles.active : ""}`}
          onClick={() => changeSearchType("tracks")}
        >
          Треки
        </a>
      </div>

      {searchType == "all" && (
        <div className={styles.search__type_all}>
          <div className="albums flex flex-col">
            <a onClick={() => changeSearchType("albums")} className={styles.search__title_link}>
              Альбомы
            </a>
            <div className={`${styles.search__albums_items} flex flex-col`}>
              {searchData.albums.items.map((album, i) => {
                if (i < 6) {
                  return <SearchItemAlbum key={album.id} data={album}></SearchItemAlbum>;
                }
              })}
            </div>
          </div>
          <div className="albums flex flex-col">
            <a onClick={() => changeSearchType("tracks")} className={styles.search__title_link}>
              Треки
            </a>
            {searchData.tracks.items.map((track, i) => {
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
            {searchData.albums.items.map((album) => (
              <SearchItemAlbum key={album.id} data={album}></SearchItemAlbum>
            ))}
          </div>
        </div>
      )}
      {searchType == "tracks" && (
        <div className="albums flex flex-col">
          <h3 className="default_title_md text-theme-black ml-[10px] mb-[5px]">Треки</h3>
          {searchData.tracks.items.map((track) => (
            <SearchItemTrack key={track.id} data={track}></SearchItemTrack>
          ))}
        </div>
      )}
    </div>
  );
}
