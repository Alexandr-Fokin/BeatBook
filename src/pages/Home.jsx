import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const { setHeaderConfig } = useOutletContext();
  useEffect(() => {
    setHeaderConfig({
      title: "Добро пожаловать",
      tools: null,
    });
  }, []);
  return <div>Домашний экран</div>;
}
