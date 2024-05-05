import { useSelector } from "react-redux";
import { INotification } from "../helpers/types";
import TrashIcon from "./Icons/TrashIcon";
import { RootState } from "../redux/store";
import { axiosProtected } from "../api/axios";
import { ErrorMessage } from "../helpers/functions";

type PropType = {
  notification: INotification;
  fetchAllNotifications: () => void;
};

const Notification: React.FC<PropType> = (props) => {
  const { notification } = props;
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

  const deleteNotification = async () => {
    const response = confirm(
      "Are you sure you want to remove?\n- " + notification.title
    );
    if (response) {
      try {
        await axiosProtected.delete(`/notifications/${notification.id}`);
        props.fetchAllNotifications();
      } catch (error) {
        ErrorMessage("An error has occured");
      }
    }
  };

  return (
    <div className="md:max-w-5xl">
      <div
        className={`${
          notification.important ? "bg-red-600" : "bg-green-600"
        } text-white flex gap-5 justify-between p-2 rounded-md rounded-br-none rounded-bl-none`}
      >
        <p>{notification.title}</p>
        {notification.important ? (
          <p className="font-semibold">IMPORTANT!</p>
        ) : null}
        <p>{notification.date}</p>
      </div>
      <div className="flex flex-col border-2 border-gray-500 rounded-md rounded-t-none">
        <textarea
          disabled
          className="w-full pl-1 h-24"
          defaultValue={notification.body}
        />
        {isAdmin && (
          <button onClick={deleteNotification} className="w-fit self-end">
            <TrashIcon />
          </button>
        )}
      </div>
    </div>
  );
};
export default Notification;
