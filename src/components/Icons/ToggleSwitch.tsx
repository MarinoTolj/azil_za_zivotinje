import { Icon } from "@mdi/react";
import { mdiToggleSwitch, mdiToggleSwitchOff } from "@mdi/js";
import { toggleIsAdmin } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const toggleSize = 2;

const ToggleSwitch = () => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(toggleIsAdmin())} className="fit">
      {isAdmin ? (
        <Icon path={mdiToggleSwitch} size={toggleSize} color="green" />
      ) : (
        <Icon path={mdiToggleSwitchOff} size={toggleSize} color="red" />
      )}
    </button>
  );
};
export default ToggleSwitch;
