import styles from "./SearchItem.module.css";
import { DataStore } from "../../dataStore";
import { getToken } from "../../spotifyApi";

export default function SearchItem(props) {
  let dataType =
    props.data.type == "album"
      ? "Альбом"
      : props.data.type == "single"
      ? "Сингл"
      : "Что-то другое";
  let releaseYear = new Date(props.data.release_date).getFullYear();

  function addAlbum(album, folder) {
    let addedAlbums = DataStore.getUserData();
    console.log(addedAlbums);
    addedAlbums.albums.push({
      id: album.id,
      name: album.name,
      artists: [...album.artists],
      images: [...album.images],
      type: album.type,
      release: album.release_date,
      addedAt: new Date(),
      folder: folder || "liked",
    });
    DataStore.saveUserData(addedAlbums);
    console.log(DataStore.getUserData());
    addTracks(getAlbumsTracks(album.id), album.id);
  }
  async function getAlbumsTracks(id) {
    const token = await getToken();
    const response = await fetch(
      `https://api.spotify.com/v1/albums/${id}/tracks`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    const data = await response.json();
    console.log("треки из альбома - ", data.items);
    return data.items; // массив треков
  }
  async function addTracks(tracks, albumId) {
    let addedAlbums = DataStore.getUserData();
    let albumTracks = await tracks;

    albumTracks.map((track) => {
      addedAlbums.tracks.push({
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
    DataStore.saveUserData(addedAlbums);
    console.log(DataStore.getUserData());
  }

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
        <a
          className={styles.item__right_like}
          onClick={() => {
            addAlbum(props.data);
          }}
        >
          ❤️
        </a>
      </div>
    </li>
  );
}
