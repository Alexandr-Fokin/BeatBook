import { createContext, useState, useContext } from "react";
import { DataStore } from "../../dataStore";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [popup, setPopup] = useState(null);
  const [userData, setUserData] = useState(DataStore.getUserData());
  const [page, setPage] = useState("added");
  const [pageItem, setPageItem] = useState(null);

  return (
    <AppContext.Provider value={{ popup, setPopup, userData, setUserData, page, setPage, pageItem, setPageItem }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
}
