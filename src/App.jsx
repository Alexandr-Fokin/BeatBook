import { useState } from "react";
import styles from "./App.module.css";
import Search from "./components/search/Search";

import { useAppContext } from "./components/appContext/AppContext";
import Popup from "./components/popup/Popup";
import Sidebar from "./components/sidebar/Sidebar";
import FormRemoveFolder from "./components/formRemoveFolder/FormRemoveFolder";
import ItemsGrid from "./components/ItemsGrid/ItemsGrid";
import Header from "./components/header/Header";
import ItemInfo from "./components/itemInfo/ItemInfo";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const { page, setPage, userData, setPopup, pageItem, setPageItem } = useAppContext();

  function getTitle() {
    if (page == "added") return "Все альбомы";
    if (page == "search") return `Поиск по: ${searchValue}`;
    if (page == "item") return pageItem.name;
    let folder = userData.folders.find((f) => f.id == page);
    if (folder) return folder.name;
    return "Неизвестно";
  }

  function activateSearch() {
    setPage("search");
    document.querySelector(`.${styles.header__search_input}`).focus();
  }

  return (
    <div className={styles.app}>
      <Header
        setLoading={setLoading}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setSearchData={setSearchData}
      ></Header>
      <Sidebar></Sidebar>
      <div className={styles.main}>
        <div className={styles.main_header}>
          <div className={styles.main_header__page_title}>{getTitle()}</div>
          <div className={styles.main_header__tools}>
            {page != "search" && page != "added" && (
              <a
                className={styles.main_header__delete_folder}
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
        <div className="main-box flex flex-col gap-[15px] w-full">
          {loading && <div>Загрузка</div>}
          {page == "search" && (
            <>
              <Search data={searchData}></Search>
            </>
          )}
          {page == "added" && (
            <>
              <ItemsGrid items={userData.added}></ItemsGrid>
            </>
          )}
          {userData.folders.map((folder) => {
            if (page == folder.id) {
              let folderItems = userData.added.filter((a) => a.folder.some((f) => f.id == folder.id));
              return <ItemsGrid items={folderItems}></ItemsGrid>;
            }
          })}
          {page == "item" && <ItemInfo item={pageItem}></ItemInfo>}
        </div>
      </div>
      <nav className={styles.menu__box}>
        <button className={page == "added" ? styles.active : ""} onClick={() => setPage("added")}>
          Все альбомы
        </button>
        <button className={page == "search" ? styles.active : ""} onClick={() => activateSearch()}>
          Поиск
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("userData");
            window.location.reload();
          }}
        >
          Очистить все
        </button>
        <button href="https://trello.com/b/1E4arcJO/beatbook-roadmap">RoadMap</button>
      </nav>
      <Popup></Popup>
    </div>
  );
}

export default App;
