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
import { Header } from "./components/Header";
import AnimalRegistrationForm from "./routes/AnimalRegistrationForm";
import Donations from "./routes/Donations";
import Notifications from "./routes/Notifications";
import { PersistGate } from "redux-persist/integration/react";
import Animal from "./routes/Animal";
//import Footer from "./components/Footer";

export type RouteType = RouteObject & {
  path:
    | "/"
    | "/all-animals"
    | "/all-animals/:id"
    | "/animal-registration-form"
    | "/donations"
    | "/notifications";
};

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
  {
    path: "/all-animals/:id",
    element: <Animal />,
  },
  {
    path: "/donations",
    element: <Donations />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
  {
    path: "/animal-registration-form",
    element: <AnimalRegistrationForm />,
  },
];

export const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Header routes={routes} />
        <RouterProvider router={router} />
        {/* <Footer /> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
