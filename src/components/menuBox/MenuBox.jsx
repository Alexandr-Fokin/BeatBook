import styles from "./MenuBox.module.css";
import { NavLink } from "react-router-dom";

export default function MenuBox() {
  return (
    <nav className={styles.menu__box}>
      <NavLink to="/added">Все альбомы</NavLink>
      {/* <NavLink to="/search">Поиск</NavLink> */}
      <button
        onClick={() => {
          localStorage.removeItem("userData");
          window.location.reload();
        }}
      >
        Очистить все
      </button>
      <a target="_blank" href="https://trello.com/b/1E4arcJO/beatbook-roadmap">
        RoadMap
      </a>
    </nav>
  );
}
