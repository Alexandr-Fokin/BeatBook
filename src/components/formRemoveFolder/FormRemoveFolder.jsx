import { DataStore } from "../../dataStore";
import { useAppContext } from "../appContext/AppContext";
import styles from "./FormRemoveFolder.module.css";

export default function FormRemoveFolder({ folder }) {
  const { setPopup, userData, setUserData, setPage } = useAppContext();
  function removeFolder(folderToRemove) {
    let updatedItems = userData.added
      .map((item) => ({
        ...item,
        folder: item.folder.filter((f) => f.id !== folderToRemove.id),
      }))
      .filter((item) => item.folder.length > 0);
    console.log("updatedItems", updatedItems);
    let updatedFolders = userData.folders.filter((folder) => {
      return folder.id !== folderToRemove.id;
    });

    let updatedData = {
      ...userData,
      added: updatedItems,
      folders: updatedFolders,
    };

    DataStore.saveUserData(updatedData);
    setUserData(updatedData);

    setPopup(null);
    setPage("added");
  }

  return (
    <div className={styles.form}>
      <div className={styles.form_msg_title}>
        Вы точно хотите удалить папку: <span>{folder.name}</span>
      </div>

      <div className="buttons flex gap-2 flex-col">
        <div className="button-cancel default_btn_secondary w-full" onClick={() => setPopup(null)}>
          Отмена
        </div>
        <div className="button-remove default_btn_destructive w-full" onClick={() => removeFolder(folder)}>
          Удалить
        </div>
      </div>
    </div>
  );
}
