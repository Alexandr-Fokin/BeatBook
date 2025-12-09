import styles from "./SearchItemTrack.module.css";
import { DataStore } from "../../../dataStore";
import { useAppContext } from "../../appContext/AppContext";
import FormAddItem from "../../formAddItem/FormAddItem";
import checkImg from "../../../img/check-svg.svg";
import plusImg from "../../../img/plus-svg.svg";

export default function SearchItemTrack(props) {
  const { setPopup } = useAppContext();
  let dataType =
    props.data.type == "album"
      ? "Альбом"
      : props.data.type == "single"
      ? "Сингл"
      : props.data.type == "track"
      ? "Трек"
      : "Что-то другое";
  let releaseYear = new Date(props.data.album.release_date).getFullYear();

  function openPopupAddAlbum(item) {
    setPopup(<FormAddItem item={item}></FormAddItem>);
  }
  function albumIsAdded(album) {
    let addedAlbums = DataStore.getUserData();
    if (addedAlbums.added.find((t) => t.id == album.id)) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <li
      className={styles.item + (albumIsAdded(props.data) ? ` ${styles.added}` : "")}
      onClick={() => {
        openPopupAddAlbum(props.data);
      }}
    >
      <div className={styles.item__left}>
        <img src={props.data.album.images[2].url} className={styles.item__left_img} />
        <div className={styles.item__left_right}>
          <span className={styles.item__left_name}>{props.data.name}</span>
          <div className={styles.item__left_meta}>
            <div className="item__left_meta_type" data-type={props.data.type}>
              {dataType}
            </div>
            <div className="item__left_meta_separator">/</div>
            <div className="item__left_meta_year" data-release={props.data.album.release_date}>
              {releaseYear}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.item__right_authors}>
        {props.data.artists.map((artist, i) => {
          if (i < props.data.artists.length - 1) {
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
      </div>
      <div className={styles.item__right}>
        <a className={styles.item__right_like}>
          {albumIsAdded(props.data) ? <img src={checkImg}></img> : <img src={plusImg}></img>}
        </a>
      </div>
    </li>
  );
}
