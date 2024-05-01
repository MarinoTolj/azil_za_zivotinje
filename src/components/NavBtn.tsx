import { Link, useLocation } from "react-router-dom";
import { RouteType } from "../main";

type PropType = {
  path: RouteType["path"];
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
    case "/animal-registration-form":
      routeName = "New Animal";
      break;
    case "/donations":
      routeName = "Donations";
      break;
    case "/notifications":
      routeName = "Notifications";
      break;
      case "/login":
        routeName="Login";
        break;
      case "/registration":
        routeName="Registration";
        break;
      default:
      routeName = "";
  }
  return routeName;
};

const NavBtn: React.FC<PropType> = (props) => {
  const location = useLocation();

  if (props.path === "/all-animals/:id") return null;
  return (
    <Link
      to={props.path}
      className={`${
        props.path === location.pathname
          ? "bg-green-700 text-slate-200"
          : "bg-slate-300"
      }  p-3 rounded-md hover:scale-105`}
    >
      {getRouteName(props.path)}
    </Link>
  );
};
export default NavBtn;
