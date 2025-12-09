import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export default function NotFoundPage() {
  const { setHeaderConfig } = useOutletContext();
  useEffect(() => {
    setHeaderConfig({
      title: "",
      tools: null,
    });
  }, []);
  return <div>Not Found</div>;
}
