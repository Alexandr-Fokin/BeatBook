import checkImg from "../../img/check-svg.svg";
import plusImg from "../../img/plus-svg.svg";
import styles from "./FormFolderItem.module.css";
import { getToken } from "../../spotifyApi";
import { DataStore } from "../../dataStore";

export default function FormFolderItem({ folder, album, userData, setUserData }) {
  function ToggleAlbumToFolder(album, folderId) {
    let updatedData = { ...userData };
    let addedAlbum = updatedData.albums.find((a) => a.id === album.id);

    if (addedAlbum) {
      // если уже есть в этой папке → убираем (toggle)
      if (addedAlbum.folder.includes(folderId)) {
        addedAlbum.folder = addedAlbum.folder.filter((f) => f !== folderId);
        if (addedAlbum.folder.length == 0) removeAlbum(addedAlbum);
      } else {
        addedAlbum.folder.push(folderId);
      }
      DataStore.saveUserData(updatedData);
      setUserData(updatedData);
    } else {
      // если альбом ещё не добавлен
      addAlbum(album, folderId);
      addTracks(getAlbumsTracks(album.id), album.id);
    }
  }

  function addAlbum(album, folderId) {
    let userData = DataStore.getUserData();
    userData.albums.push({
      id: album.id,
      name: album.name,
      artists: [...album.artists],
      images: [...album.images],
      type: album.type,
      release_date: album.release_date,
      addedAt: new Date(),
      folder: [folderId],
    });
    DataStore.saveUserData(userData);
    setUserData(userData);
    console.log("добавлен альбом", DataStore.getUserData());
    addTracks(getAlbumsTracks(album.id), album.id);
  }
  function removeAlbum(album) {
    setUserData((prev) => {
      let updatedAlbums = prev.albums.filter((a) => a.id !== album.id);
      let updatedTracks = prev.tracks.filter((t) => t.albumId !== album.id);
      let updatedData = {
        ...prev,
        albums: updatedAlbums,
        tracks: updatedTracks,
      };
      DataStore.saveUserData(updatedData);
      console.log("после удаления - ", updatedData);
      return updatedData;
    });
  }

  async function getAlbumsTracks(id) {
    const token = await getToken();
    const response = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
      headers: { Authorization: "Bearer " + token },
    });
    const data = await response.json();
    console.log("треки из альбома - ", data.items);
    return data.items; // массив треков
  }
  async function addTracks(tracks, albumId) {
    let userData = DataStore.getUserData();
    let albumTracks = await tracks;

    albumTracks.map((track) => {
      userData.tracks.push({
        id: track.id,
        albumId: albumId,
        name: track.name,
        artists: [...track.artists],
        duration: track.duration_ms,
        track_number: track.track_number,
        rating: 0,
        comment: "",
        addedAt: new Date(),
        explicit: track.explicit,
        external_url: track.external_urls.spotify,
      });
    });
    DataStore.saveUserData(userData);
    setUserData(userData);
    console.log("добавлены треки", DataStore.getUserData());
  }

  return (
    <div className={styles.folder__item} onClick={() => ToggleAlbumToFolder(album, folder.id)}>
      <div>{folder.name}</div>
      <a>
        {userData.albums.find((addedAlbum) => addedAlbum.id == album.id)?.folder.includes(folder.id) ? (
          <div className={`${styles.folder__item_like} ${styles.added}`}>
            <img src={checkImg}></img>
          </div>
        ) : (
          <div className={styles.folder__item_like}>
            <img src={plusImg}></img>
          </div>
        )}
      </a>
    </div>
  );
}
