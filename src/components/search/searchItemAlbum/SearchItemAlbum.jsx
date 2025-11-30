import styles from "./SearchItemAlbum.module.css";
import { DataStore } from "../../../dataStore";
import { useAppContext } from "../../appContext/AppContext";
import FormAddItem from "../../formAddItem/FormAddItem";
import checkImg from "../../../img/check-svg.svg";
import plusImg from "../../../img/plus-svg.svg";
import { findItemType } from "../../../hooks";

export default function SearchItemAlbum({ data }) {
  const { popup, setPopup, userData } = useAppContext();
  let dataType = findItemType(data);
  let releaseYear = new Date(data.release_date).getFullYear();

  function openPopupAddAlbum(album) {
    setPopup(<FormAddItem item={album}></FormAddItem>);
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
    <li
      className={styles.item + (albumIsAdded(data) ? ` ${styles.added}` : "")}
      onClick={() => {
        openPopupAddAlbum(data);
      }}
    >
      <div className={styles.item__top}>
        <img src={data.images[1].url} className={styles.item__img} alt="" />
        <a className={styles.item__like}>
          {albumIsAdded(data) ? <img src={checkImg}></img> : <img src={plusImg}></img>}
        </a>
      </div>
      <div className={styles.item__bottom}>
        <div className={styles.item__name}>{data.name}</div>
        <div className={styles.item__meta}>
          <span>
            {data.artists.map((artist, i) => {
              if (i < data.artists.length - 1) {
                return (
                  <a target="_blank" href={artist.external_urls.spotify} key={artist.id}>
                    {artist.name},{" "}
                  </a>
                );
              }
              return (
                <a target="_blank" href={artist.external_urls.spotify} key={artist.id}>
                  {artist.name}
                </a>
              );
            })}
          </span>{" "}
          - <span>{dataType}</span>
        </div>
      </div>
    </li>
  );
}
