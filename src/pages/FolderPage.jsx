import { useParams, useOutletContext, Navigate } from "react-router-dom";
import { useAppContext } from "../components/appContext/AppContext";
import ItemsGrid from "../components/ItemsGrid/ItemsGrid";
import { useEffect } from "react";
import NotFoundPage from "./NotFoundPage";

export default function FolderPage() {
  const { folderId } = useParams();
  const { userData } = useAppContext();
  const { setHeaderConfig } = useOutletContext();

  const folder = userData.folders.find((f) => f.id == folderId);

  useEffect(() => {
    if (!folder) return;
    setHeaderConfig({
      title: folder.name,
      tools: folder.id == "liked" ? "" : "delete",
    });
  }, [folder]);

  if (!folder) return <NotFoundPage />;

  return (
    <div>
      {userData.folders.map((folder) => {
        if (folderId == folder.id) {
          let folderItems = userData.added.filter((a) => a.folder.some((f) => f.id == folder.id));
          return <ItemsGrid items={folderItems}></ItemsGrid>;
        }
      })}
    </div>
  );
}
