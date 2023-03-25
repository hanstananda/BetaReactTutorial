import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import Setup from "./pages/Setup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Setup />,
  },
  {
    path: "/game",
    element: <App />,
  },
], {
  basename: import.meta.env.BASE_URL
});

console.log("Basepath is ",import.meta.env.BASE_URL)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
