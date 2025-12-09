import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import AddedPage from "./pages/AddedPage";
import ItemPage from "./pages/ItemPage";
import FolderPage from "./pages/FolderPage";
import SearchPage from "./pages/SearchPage";
import { searchAlbumsData } from "./spotifyApi";
import NotFoundPage from "./pages/NotFoundPage";

const fetchSearchData = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");
  const result = await searchAlbumsData(query);
  return result;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "added", element: <AddedPage /> },
      { path: "item/:itemId", element: <ItemPage /> },
      { path: "folder/:folderId", element: <FolderPage /> },
      {
        path: "search",
        element: <SearchPage />,
        loader: fetchSearchData,
        shouldRevalidate: ({ currentUrl, nextUrl }) => {
          return currentUrl.searchParams.get("q") !== nextUrl.searchParams.get("q");
        },
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
