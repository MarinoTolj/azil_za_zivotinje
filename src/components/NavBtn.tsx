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
          ? "bg-green-600 text-white"
          : "bg-slate-300"
      }  p-3 rounded-md`}
    >
      {getRouteName(props.path)}
    </Link>
  );
};
export default NavBtn;
