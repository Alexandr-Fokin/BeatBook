import Search from "../components/search/Search";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export default function SearchPage() {
  const { setHeaderConfig } = useOutletContext();
  useEffect(() => {
    setHeaderConfig({
      title: "Поиск по запросу",
      tools: null,
    });
  }, []);
  return <Search />;
}
