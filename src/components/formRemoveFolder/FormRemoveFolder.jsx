import { DataStore } from "../../dataStore";
import { useAppContext } from "../appContext/AppContext";

export default function FormRemoveFolder({ folder }) {
  const { setPopup, userData, setUserData, setPage } = useAppContext();
  function removeFolder(folderToRemove) {
    let updatedAlbums = userData.albums
      .map((album) => ({
        ...album,
        folder: album.folder.filter((f) => f !== folderToRemove.id),
      }))
      .filter((album) => album.folder.length > 0);

    let updatedTracks = userData.tracks.filter((track) => {
      return updatedAlbums.some((album) => album.id === track.albumId);
    });
    let updatedFolders = userData.folders.filter((folder) => {
      return folder.id !== folderToRemove.id;
    });

    let updatedData = {
      ...userData,
      albums: updatedAlbums,
      tracks: updatedTracks,
      folders: updatedFolders,
    };

    setUserData(updatedData);
    DataStore.saveUserData(updatedData);

    alert(`Папка "${folderToRemove.name}" удалена`);
    setPopup(null);
    setPage("added");
  }

  return (
    <div className="form">
      <div className="">
        Вы точно хотите удалить папку: <span>{folder.name}</span>
      </div>
      <div className="buttons">
        <div className="button-cancel" onClick={() => setPopup(null)}>
          Отмена
        </div>
        <div className="button-remove" onClick={() => removeFolder(folder)}>
          Удалить
        </div>
      </div>
    </div>
  );
}
