import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import AllAnimals from "./routes/AllAnimals";
import ErrorPage from "./components/ErrorPage";
import { Header } from "./components/Header";

export type RouteType = RouteObject & { path: "/" | "/all-animals" };

const routes: RouteType[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/all-animals",
    element: <AllAnimals />,
  },
];

export const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Header routes={routes} />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
