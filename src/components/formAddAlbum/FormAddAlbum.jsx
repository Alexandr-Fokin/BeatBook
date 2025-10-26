import styles from "./FormAddAlbum.module.css";
import FormFolderItem from "../formFolderItem/FormFolderItem";
import { useAppContext } from "../appContext/AppContext";

export default function FormAddAlbum({ album }) {
  const { userData, setUserData } = useAppContext();

  return (
    <div className="add_album">
      <div className={styles.add_album__info}>
        <img
          className={styles.add_album__info_left}
          src={album.images[2].url}
          alt=""
        />
        <div className={styles.add_album__info_right}>
          <div className={styles.add_album__info_name}>{album.name}</div>
        </div>
      </div>
      <div className={styles.add_album__tools}>
        {/* <label htmlFor="" className={styles.add_album__tools_search}>
          <input type="text" placeholder="Поиск" />
        </label> */}
        <div className={styles.add_album__tools_add_folder}>
          <a href="" className={styles.add_album__tools_add_folder_btn}>
            Создать папку
          </a>
        </div>
      </div>
      <div className={styles.add_album__folders}>
        {userData.folders.map((folder) => (
          <FormFolderItem
            folder={folder}
            album={album}
            userData={userData}
            setUserData={setUserData}
          ></FormFolderItem>
        ))}
      </div>
    </div>
  );
}
