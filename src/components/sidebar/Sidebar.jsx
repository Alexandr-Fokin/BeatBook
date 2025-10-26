import { useAppContext } from "../appContext/AppContext";
import styles from "./Sidebar.module.css";
import FormAddFolder from "../formAddFolder/formAddFolder";

export default function Sidebar() {
  let { userData, setUserData, page, setPage, setPopup } = useAppContext();
  function openPopupAddFolder() {
    setPopup(<FormAddFolder></FormAddFolder>);
  }
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__header}>
        <div className={styles.sidebar__header_title}>Медиатека</div>
        <a className={styles.sidebar__header_add_btn} onClick={openPopupAddFolder}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 768 768">
            <g id="icomoon-ignore"></g>
            <path d="M160 416h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32v-192h192c17.664 0 32-14.336 32-32s-14.336-32-32-32h-192v-192c0-17.664-14.336-32-32-32s-32 14.336-32 32v192h-192c-17.664 0-32 14.336-32 32s14.336 32 32 32z"></path>
          </svg>
          Создать
        </a>
      </div>
      <div className={styles.sidebar__folders}>
        <a
          onClick={() => {
            setPage("added");
          }}
          className={`${styles.sidebar__folder} ${"added" == page ? styles.active : ""}`}
        >
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 768 768">
            <g id="icomoon-ignore"></g>
            <path d="M736 608v-352c0-26.496-10.784-50.56-28.128-67.872s-41.376-28.128-67.872-28.128h-270.88l-54.496-81.76c-5.824-8.64-15.552-14.24-26.624-14.24h-160c-26.496 0-50.56 10.784-67.872 28.128s-28.128 41.376-28.128 67.872v448c0 26.496 10.784 50.56 28.128 67.872s41.376 28.128 67.872 28.128h512c26.496 0 50.56-10.784 67.872-28.128s28.128-41.376 28.128-67.872zM672 608c0 8.832-3.552 16.8-9.376 22.624s-13.792 9.376-22.624 9.376h-512c-8.832 0-16.8-3.552-22.624-9.376s-9.376-13.792-9.376-22.624v-448c0-8.832 3.552-16.8 9.376-22.624s13.792-9.376 22.624-9.376h142.88l54.496 81.76c6.144 9.184 16.192 14.176 26.624 14.24h288c8.832 0 16.8 3.552 22.624 9.376s9.376 13.792 9.376 22.624z"></path>
          </svg>
          Все альбомы
        </a>
        {userData.folders.map((folder) => (
          <a
            onClick={() => {
              setPage(folder.id);
            }}
            key={folder.id}
            className={`${styles.sidebar__folder} ${folder.id == page ? styles.active : ""}`}
          >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="768" height="768" viewBox="0 0 768 768">
              <g id="icomoon-ignore"></g>
              <path d="M736 608v-352c0-26.496-10.784-50.56-28.128-67.872s-41.376-28.128-67.872-28.128h-270.88l-54.496-81.76c-5.824-8.64-15.552-14.24-26.624-14.24h-160c-26.496 0-50.56 10.784-67.872 28.128s-28.128 41.376-28.128 67.872v448c0 26.496 10.784 50.56 28.128 67.872s41.376 28.128 67.872 28.128h512c26.496 0 50.56-10.784 67.872-28.128s28.128-41.376 28.128-67.872zM672 608c0 8.832-3.552 16.8-9.376 22.624s-13.792 9.376-22.624 9.376h-512c-8.832 0-16.8-3.552-22.624-9.376s-9.376-13.792-9.376-22.624v-448c0-8.832 3.552-16.8 9.376-22.624s13.792-9.376 22.624-9.376h142.88l54.496 81.76c6.144 9.184 16.192 14.176 26.624 14.24h288c8.832 0 16.8 3.552 22.624 9.376s9.376 13.792 9.376 22.624z"></path>
            </svg>
            {folder.name}
          </a>
        ))}
      </div>
    </div>
  );
}
