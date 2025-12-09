import { useParams, useOutletContext, Navigate } from "react-router-dom";
import { useAppContext } from "../components/appContext/AppContext";
import ItemInfo from "../components/itemInfo/ItemInfo";
import { useEffect } from "react";
import NotFoundPage from "./NotFoundPage";

export default function ItemPage() {
  const { userData } = useAppContext();
  const { itemId } = useParams();
  const { setHeaderConfig } = useOutletContext();

  const item = userData.added.find((i) => i.id == itemId);

  useEffect(() => {
    if (!item) return;
    setHeaderConfig({
      title: item.name,
      tools: null,
    });
  }, [item]);

  if (!item) return <NotFoundPage />;

  return <ItemInfo item={item}></ItemInfo>;
}
