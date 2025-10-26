import { useState } from "react";
import styles from "./FormAddFolder.module.css";
import { useAppContext } from "../appContext/AppContext";
import { DataStore } from "../../dataStore";

export default function FormAddFolder() {
  const [folderName, setFolderName] = useState("");
  const [folderId, setFolderId] = useState("");
  const { userData, setUserData, setPopup } = useAppContext();

  function addFolder(e) {
    e.preventDefault();
    let updatedData = { ...userData };
    updatedData.folders.push({ id: folderId, name: folderName });
    setUserData(updatedData);
    DataStore.saveUserData(updatedData);
    setFolderName("");
    setFolderId("");
    setPopup(null);
  }
  return (
    <div className={styles.add_folder}>
      <div className={`${styles.add_folder__title} default_subtitle_sm`}>Добавить папку</div>
      <form action="" className={styles.add_folder__form} onSubmit={addFolder}>
        <input
          type="text"
          name="name"
          className="default_input_md"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Название"
        />
        <input
          type="text"
          name="id"
          className="default_input_md"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
          placeholder="ID"
        />
        <button type="submit" className={styles.add_folder__form_submit}>
          Создать
        </button>
      </form>
    </div>
  );
}
