import { useState } from "react";
import styles from "./FormAddFolder.module.css";
import { useAppContext } from "../appContext/AppContext";
import { DataStore } from "../../dataStore";
import { Icons } from "../../icons/icons";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

export default function FormAddFolder({ folderForm, setFolderForm }) {
  const [folderName, setFolderName] = useState("");
  const [folderIcon, setFolderIcon] = useState(1);
  const [folderIconMenu, setFolderIconMenu] = useState(false);
  const { userData, setUserData } = useAppContext();
  const Icon = Icons[folderIcon];
  const navigate = useNavigate();

  function addFolder(e) {
    e.preventDefault();
    let updatedData = { ...userData };
    let folderId = nanoid(22);
    updatedData.folders.push({ id: folderId, name: folderName, parentId: null, icon: folderIcon });
    setUserData(updatedData);
    DataStore.saveUserData(updatedData);
    setFolderName("");
    setFolderForm(false);
    navigate(`/folder/${folderId}`);
    setFolderIcon(1);
  }
  function selectFolderIcon(key) {
    setFolderIcon(key);
    setFolderIconMenu(false);
  }
  return (
    <div className={styles.add_folder}>
      <form action="" className={styles.add_folder__form} onSubmit={addFolder}>
        <div className={styles.add_folder__form_top}>
          <div className={styles.add_folder__form_icon_box}>
            <div className={styles.add_folder__form_icon} onClick={() => setFolderIconMenu(!folderIconMenu)}>
              <Icon></Icon>
            </div>
            {folderIconMenu && (
              <div className={styles.add_folder__form_icons}>
                {Object.keys(Icons).map((key) => {
                  if (key == 99) return null;
                  const IconComp = Icons[key];
                  return (
                    <div
                      className={`${styles.add_folder__form_icons_item} ${key == folderIcon ? styles.active : ""}`}
                      onClick={() => selectFolderIcon(key)}
                    >
                      <IconComp />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <input
            type="text"
            name="name"
            className="default_input_md"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Новая папка"
          />
        </div>

        <button type="submit" className={styles.add_folder__form_submit}>
          Создать
        </button>
      </form>
    </div>
  );
}
