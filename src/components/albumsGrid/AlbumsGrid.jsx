import { useAppContext } from "../appContext/AppContext";
import styles from "./AlbumsGrid.module.css";
import { DataStore } from "../../dataStore";
import checkImg from "../../img/check-svg.svg";
import plusImg from "../../img/plus-svg.svg";

export default function AlbumsGrid({ albums }) {
  const { popup, setPopup } = useAppContext();
  console.log("albums", albums);

  function getArtistsList(album) {
    if (!album.artists?.length) return "Не указано";
    let list = album.artists.map((artist) => artist.name).join(", ");
    console.log(list);
    return list;
  }
  function findAlbumType(albumType) {
    return albumType == "album" ? "Альбом" : albumType == "single" ? "Сингл" : "Что-то другое";
  }
  function openPopupAddAlbum(album) {
    setPopup(<FormAddAlbum album={album}></FormAddAlbum>);
  }
  function albumIsAdded(album) {
    let addedAlbums = DataStore.getUserData();
    if (addedAlbums.albums.find((a) => a.id == album.id)) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div className={styles.albums_grid}>
      {albums.map((album) => (
        <li className={styles.albums_grid__item} key={album.id}>
          <div className={styles.albums_grid__item_top}>
            <img src={album.images[1].url} className={styles.albums_grid__item_img} alt="" />
          </div>
          <div className={styles.album_grid__item_bottom}>
            <div className={styles.album_grid__item_name}>{album.name}</div>
            <div className={styles.album_grid__item_meta}>
              <span>{getArtistsList(album)}</span> - <span>{findAlbumType(album.type)}</span>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
}
