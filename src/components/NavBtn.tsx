import { RouteType } from "../main";

type PropType = {
  path: RouteType["path"];
};

const hostName = "http://127.0.0.1:5173";

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

const NavBtn: React.FC<PropType> = (props) => {
  const thisUrl = getPathName(window.location.href);

  return (
    <a
      href={props.path}
      className={`${
        props.path === thisUrl ? "bg-green-600" : "bg-slate-300"
      }  p-3 rounded-md`}
    >
      {getRouteName(props.path)}
    </a>
  );
};
export default NavBtn;
