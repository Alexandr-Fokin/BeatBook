import { useState } from "react";
import styles from "./App.module.css";
import SearchItem from "./components/searchItem/SearchItem";
import { searchAlbumsData } from "./spotifyApi";
import { DataStore } from "./dataStore";
import { useAppContext } from "./components/appContext/AppContext";
import Popup from "./components/popup/Popup";
import Sidebar from "./components/sidebar/Sidebar";
import FormRemoveFolder from "./components/formRemoveFolder/FormRemoveFolder";
import AlbumsGrid from "./components/albumsGrid/AlbumsGrid";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const { page, setPage, userData, setPopup } = useAppContext();
  const searchAlbums = async (e) => {
    e.preventDefault();
    setPage("search");
    setLoading(true);
    setSearchData(await searchAlbumsData(searchValue));
    setLoading(false);
  };

  function getTitle() {
    if (page == "added") return "Все альбомы";
    if (page == "search") return `Поиск по: ${searchValue}`;
    let folder = userData.folders.find((f) => f.id == page);
    if (folder) return folder.name;
    return "Неизвестно";
  }

  return (
    <div className={styles.app}>
      <Sidebar></Sidebar>
      <div className="main">
        <div className={styles.header}>
          <div className={styles.header__inner}>
            <div className={styles.header__page_title}>{getTitle()}</div>
            <div className={styles.header__tools}>
              <form onSubmit={searchAlbums}>
                <label htmlFor="">
                  <input
                    type="text"
                    className={styles.header__search_input}
                    value={searchValue}
                    placeholder="Поиск"
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </label>
              </form>
              {page != "search" && page != "added" && (
                <a
                  className={styles.header__delete_folder}
                  onClick={() =>
                    setPopup(<FormRemoveFolder folder={userData.folders.find((f) => f.id == page)}></FormRemoveFolder>)
                  }
                >
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 768 768">
                    <g id="icomoon-ignore"></g>
                    <path d="M576 224v416c0 8.832-3.552 16.8-9.376 22.624s-13.792 9.376-22.624 9.376h-320c-8.832 0-16.8-3.552-22.624-9.376s-9.376-13.792-9.376-22.624v-416zM544 160v-32c0-26.496-10.784-50.56-28.128-67.872s-41.376-28.128-67.872-28.128h-128c-26.496 0-50.56 10.784-67.872 28.128s-28.128 41.376-28.128 67.872v32h-128c-17.664 0-32 14.336-32 32s14.336 32 32 32h32v416c0 26.496 10.784 50.56 28.128 67.872s41.376 28.128 67.872 28.128h320c26.496 0 50.56-10.784 67.872-28.128s28.128-41.376 28.128-67.872v-416h32c17.664 0 32-14.336 32-32s-14.336-32-32-32zM288 160v-32c0-8.832 3.552-16.8 9.376-22.624s13.792-9.376 22.624-9.376h128c8.832 0 16.8 3.552 22.624 9.376s9.376 13.792 9.376 22.624v32zM288 352v192c0 17.664 14.336 32 32 32s32-14.336 32-32v-192c0-17.664-14.336-32-32-32s-32 14.336-32 32zM416 352v192c0 17.664 14.336 32 32 32s32-14.336 32-32v-192c0-17.664-14.336-32-32-32s-32 14.336-32 32z"></path>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="main-box flex flex-col gap-[15px] w-full">
          {loading && <div>Загрузка</div>}
          {page == "search" && (
            <>
              <div className="albums flex flex-col">
                {searchData.map((album) => (
                  <SearchItem key={album.id} data={album}></SearchItem>
                ))}
              </div>
            </>
          )}
          {page == "added" && (
            <>
              <AlbumsGrid albums={userData.albums}></AlbumsGrid>
            </>
          )}
          {userData.folders.map((folder) => {
            if (page == folder.id) {
              let folderAlbums = userData.albums.filter((a) => a.folder.includes(folder.id));
              return <AlbumsGrid albums={folderAlbums}></AlbumsGrid>;
            }
          })}
        </div>
      </div>
      <nav className={styles.menu__box}>
        <button className={page == "added" ? styles.active : ""} onClick={() => setPage("added")}>
          Все альбомы
        </button>
        <button className={page == "search" ? styles.active : ""} onClick={() => setPage("search")}>
          Поиск
        </button>
      </nav>
      <Popup></Popup>
    </div>
  );
}

export default App;
