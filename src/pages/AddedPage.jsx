import { useOutletContext } from "react-router-dom";
import { useAppContext } from "../components/appContext/AppContext";
import ItemsGrid from "../components/ItemsGrid/ItemsGrid";
import { useEffect } from "react";

export default function AddedPage() {
  const { setHeaderConfig } = useOutletContext();
  useEffect(() => {
    setHeaderConfig({
      title: "Вся медиатека",
      tools: null,
    });
  }, []);
  const { userData } = useAppContext();
  return <ItemsGrid items={userData.added}></ItemsGrid>;
}
