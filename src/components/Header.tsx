import { RouteType } from "../main";
import NavBtn from "./NavBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { setIsAdmin } from "../redux/userSlice";
import { axiosProtected } from "../api/axios";
import { ErrorMessage } from "../helpers/functions";

export const Header: React.FC<{ routes: RouteType[] }> = (props) => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    axiosProtected.post(`/is_admin`).then((res) => {
      dispatch(setIsAdmin(res.data));
    });
  }, [isAdmin, dispatch, location.pathname]);

  const logout = async () => {
    try {
      await axiosProtected.get("/logout");
      await axiosProtected.post(`/is_admin`).then((res) => {
        dispatch(setIsAdmin(res.data));
      });
    } catch (error) {
      ErrorMessage("An error has occured");
    }
  };

  return (
    <header>
      <div className="flex items-center justify-between bg-main-orange p-5">
        <h1 className="text-2xl align-middle text-orange-800 font-bold md:text-5xl">
          <Link to="/">ANIMAL SHELTER</Link>
        </h1>
      </div>
      <nav className="bg-main-orange p-5 flex flex-wrap gap-3">
        {props.routes.map((route) => {
          if (
            route.path !== "/animal-registration-form" ||
            (route.path === "/animal-registration-form" && isAdmin)
          )
            return <NavBtn key={route.path} path={route.path} />;
        })}
        <Link
          to="/"
          className="bg-slate-300 p-3 rounded-md hover:scale-105"
          onClick={logout}
        >
          Logout
        </Link>
      </nav>
    </header>
  );
};
