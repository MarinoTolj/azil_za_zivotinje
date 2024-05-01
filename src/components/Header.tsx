import { RouteType } from "../main";
import NavBtn from "./NavBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ToggleSwitch from "./Icons/ToggleSwitch";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setIsAdmin } from "../redux/userSlice";
import axios from "../api/axios";
import { GetAccessToken } from "../helpers/functions";

export const Header: React.FC<{ routes: RouteType[] }> = (props) => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.post(`/is_admin`, { accessToken: GetAccessToken() }).then((res) => {
      dispatch(setIsAdmin(res.data));
    });
  }, [isAdmin, dispatch]);

  return (
    <header>
      <div className="flex items-center justify-between bg-main-orange p-5">
        <h1 className="text-2xl align-middle text-orange-800 font-bold md:text-5xl">
          <Link to="/">ANIMAL SHELTER</Link>
        </h1>
        <div className="flex items-center">
          <span className="mr-2 text-lg text-orange-950">Admin</span>
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
