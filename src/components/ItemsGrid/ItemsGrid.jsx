import { useAppContext } from "../appContext/AppContext";
import styles from "./ItemsGrid.module.css";
import checkImg from "../../img/check-svg.svg";
import plusImg from "../../img/plus-svg.svg";
import { findItemType } from "../../hooks";
import FormAddItem from "../formAddItem/FormAddItem";
import { Link } from "react-router-dom";

export default function ItemsGrid({ items }) {
  const { setPopup, userData } = useAppContext();
  console.log("айтемы для демонстрации -", items);

  function getArtistsList(item) {
    if (!item.artists?.length) return "Не указано";
    let list = item.artists.map((artist) => artist.name).join(", ");
    return list;
  }
  function openPopupAddAlbum(item) {
    setPopup(<FormAddItem item={item}></FormAddItem>);
  }
  function albumIsAdded(album) {
    let addedAlbums = { ...userData };
    if (addedAlbums.added.find((a) => a.id == album.id)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className={styles.items_grid}>
      {items.map((item) => (
        <Link
          key={item.id}
          className={styles.items_grid__item + (albumIsAdded(item) ? ` ${styles.added}` : "")}
          to={`/item/${item.id}`}
        >
          <div className={styles.items_grid__item_top}>
            <a
              className={styles.item_grid__item_like}
              onClick={(e) => {
                e.stopPropagation(); // ← ключевой момент
                openPopupAddAlbum(item);
              }}
            >
              {albumIsAdded(item) ? <img src={checkImg}></img> : <img src={plusImg}></img>}
            </a>
            <img src={item.images[1].url} className={styles.items_grid__item_img} alt="" />
          </div>
          <div className={styles.item_grid__item_bottom}>
            <div className={styles.item_grid__item_name}>{item.name}</div>
            <div className={styles.item_grid__item_meta}>
              <span>{getArtistsList(item)}</span> - <span>{findItemType(item)}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
