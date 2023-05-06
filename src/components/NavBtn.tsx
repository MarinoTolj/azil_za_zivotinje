import { RouteType } from "../main";

type PropType = {
  path: RouteType["path"];
};

const hostName =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5173"
    : "https://azil-za-zivotinje.vercel.app/";

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

const thisUrl = getPathName(window.location.href);
const NavBtn: React.FC<PropType> = (props) => {
  if (props.path === "/all-animals/:id") return null;
  return (
    <a
      href={props.path}
      className={`${
        props.path === thisUrl ? "bg-green-600 text-white" : "bg-slate-300"
      }  p-3 rounded-md`}
    >
      {getRouteName(props.path)}
    </a>
  );
};
export default NavBtn;
