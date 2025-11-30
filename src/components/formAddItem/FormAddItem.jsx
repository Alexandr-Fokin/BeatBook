import styles from "./FormAddItem.module.css";
import FormFolderItem from "../formFolderItem/FormFolderItem";
import { useAppContext } from "../appContext/AppContext";

export default function FormAddItem({ item }) {
  const { userData, setUserData } = useAppContext();

  return (
    <div className="add_album">
      <div className={styles.add_album__info}>
        <img
          className={styles.add_album__info_left}
          src={item.type == "album" ? item.images[2].url : item.album.images[2].url}
          alt=""
        />
        <div className={styles.add_album__info_right}>
          <div className={styles.add_album__info_name}>{item.name}</div>
        </div>
      </div>
      <div className={styles.add_album__tools}>
        {/* <label htmlFor="" className={styles.add_album__tools_search}>
          <input type="text" placeholder="Поиск" />
        </label> */}
        {/* <div className={styles.add_album__tools_add_folder}>
          <a href="" className={styles.add_album__tools_add_folder_btn}>
            Создать папку
          </a>
        </div> */}
      </div>
      <div className={styles.add_album__folders}>
        {userData.folders.map((folder) => (
          <FormFolderItem folder={folder} item={item}></FormFolderItem>
        ))}
      </div>
    </div>
  );
}
