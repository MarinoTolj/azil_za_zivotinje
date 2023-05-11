import { RouteType } from "../main";
import NavBtn from "./NavBtn";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ToggleSwitch from "./Icons/ToggleSwitch";
import { Link } from "react-router-dom";

export const Header: React.FC<{ routes: RouteType[] }> = (props) => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

  return (
    <header>
      <div className="flex items-center justify-between bg-main-orange p-5">
        <h1 className="text-xl align-middle text-slate-300 font-bold md:text-5xl">
          <Link to="/">ANIMAL SHELTER</Link>
        </h1>
        <div className="flex items-center">
          <span className="mr-2 text-slate-800">Admin</span>
          <ToggleSwitch />
        </div>
      </div>
      <nav className="bg-main-orange p-5 flex flex-wrap gap-3">
        {props.routes.map((route) => {
          if (
            route.path !== "/animal-registration-form" ||
            (route.path === "/animal-registration-form" && isAdmin)
          )
            return <NavBtn key={route.path} path={route.path} />;
        })}
      </nav>
    </header>
  );
};
