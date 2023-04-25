import { RouteType } from "../main";
import NavBtn from "./NavBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleIsAdmin } from "../redux/userSlice";

export const Header: React.FC<{ routes: RouteType[] }> = (props) => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const dispatch = useDispatch();
    
  return (
    <header>
      <div className="bg-slate-300 p-5">
        <h1>AZIL ZA ŽIVOTINJE</h1>
        <span className="mr-3">Admin</span>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={() => dispatch(toggleIsAdmin())}
        />
      </div>
      <nav className="bg-orange-400 p-5 flex flex-wrap gap-3">
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
