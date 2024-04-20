import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import AllAnimals from "./routes/AllAnimals";
import ErrorPage from "./components/ErrorPage";
import AnimalRegistrationForm from "./routes/AnimalRegistrationForm";
import Donations from "./routes/Donations";
import Notifications from "./routes/Notifications";
import { PersistGate } from "redux-persist/integration/react";
import Animal from "./routes/Animal";

import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";

///Url for backend
export const base_url="http://localhost:3000"

export type RouteType = RouteObject & {
  path:
    | "/"
    | "/all-animals"
    | "/all-animals/:id"
    | "/animal-registration-form"
    | "/donations"
    | "/notifications";
};

export const routes: RouteType[] = [
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: "/all-animals",
    element: (
      <Layout>
        <AllAnimals />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/all-animals/:id",
    element: (
      <Layout>
        <Animal />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/donations",
    element: (
      <Layout>
        <Donations />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/notifications",
    element: (
      <Layout>
        <Notifications />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/animal-registration-form",
    element: (
      <Layout>
        <AnimalRegistrationForm />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
];

export const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
