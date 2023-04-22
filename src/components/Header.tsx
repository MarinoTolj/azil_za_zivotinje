import { RouteObject } from "react-router";
import { RouteType } from "../main";

const hostName = "http://localhost:5173";

const getPathName = (url: string) => {
  return url.split(hostName)[1];
};

const getRouteName = (path: RouteType["path"]) => {
  let routeName = "";
  switch (path) {
    case "/":
      routeName = "Home";
      break;
    case "/all-animals":
      routeName = "Animals";
      break;
    default:
      routeName = "";
  }
  return routeName;
};

export const Header: React.FC<{ routes: RouteType[] }> = (props) => {
  const thisUrl = getPathName(window.location.href);
  return (
    <header>
      <div className="bg-slate-300 p-5">
        <h1>AZIL ZA ŽIVOTINJE</h1>
      </div>
      <nav className="bg-orange-400 p-5">
        {props.routes.map((route) => (
          <a
            key={route.id}
            href={route.path}
            className={`${
              route.path === thisUrl ? "bg-green-600" : "bg-slate-300"
            }  p-3 rounded-md`}
          >
            {getRouteName(route.path)}
          </a>
        ))}
      </nav>
    </header>
  );
};
