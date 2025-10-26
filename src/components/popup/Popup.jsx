import { useAppContext } from "../appContext/AppContext";
import styles from "./Popup.module.css";

export default function Popup() {
  const { popup, setPopup } = useAppContext();
  return (
    <>
      {popup !== null && (
        <div className={styles.popup}>
          <div
            className={styles.popup__overlay}
            onClick={() => setPopup(null)}
          ></div>
          <div className={styles.popup__block}>
            <div className={styles.popup__block_inner}>{popup}</div>

            <div className={styles.popup__close} onClick={() => setPopup(null)}>
              ✕
            </div>
          </div>
        </div>
      )}
    </>
  );
}
