import styles from "./SearchItem.module.css";
export default function SearchItem(props) {
  let dataType =
    props.data.type == "album"
      ? "Альбом"
      : props.data.type == "single"
      ? "Сингл"
      : "Что-то другое";
  let releaseYear = new Date(props.data.release_date).getFullYear();
  return (
    <li className={styles.item}>
      <div className={styles.item__left}>
        <img src={props.data.images[2].url} className={styles.item__left_img} />
      </div>
      <div className={styles.item__center}>
        <span className={styles.item__center_name}>{props.data.name}</span>
        <div className={styles.item__center_meta}>
          <div className="item__right_authors">
            {props.data.artists.map((artist, i) => {
              if (i < props.data.artists.length - 1) {
                return (
                  <a
                    target="_blank"
                    href={artist.external_urls.spotify}
                    key={artist.id}
                  >
                    {artist.name},{" "}
                  </a>
                );
              }
              return (
                <a
                  target="_blank"
                  href={artist.external_urls.spotify}
                  key={artist.id}
                >
                  {artist.name}
                </a>
              );
            })}
          </div>
          <div className="item__right_meta_separator">/</div>
          <div className="item__right_meta_type" data-type={props.data.type}>
            {dataType}
          </div>
          <div className="item__right_meta_separator">/</div>
          <div
            className="item__right_meta_year"
            data-release={props.data.release_date}
          >
            {releaseYear}
          </div>
        </div>
      </div>
      <div className={styles.item__right}>
        <a className={styles.item__right_like}>❤️</a>
      </div>
    </li>
  );
}
