import { useSelector } from "react-redux";
import { firestore } from "../firebase/firestore";
import { INotification } from "../helpers/types";
import TextArea from "./FormComponents/TextArea";
import TrashIcon from "./Icons/TrashIcon";
import { RootState } from "../redux/store";

type PropType = {
  notification: INotification;
};

const Notification: React.FC<PropType> = (props) => {
  const { notification } = props;
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

  const deleteNotification = async () => {
    await firestore.DeleteDocumentById("notifications", notification.id);
  };

  return (
    <div className="">
      <div
        className={`${
          notification.important ? "bg-red-600" : "bg-green-600"
        } text-white flex gap-5 justify-between p-2 rounded-md rounded-br-none rounded-bl-none`}
      >
        <p>{notification.title}</p>
        {notification.important ? <p>Important!</p> : null}
        <p>{notification.date}</p>
      </div>
      <div className="flex flex-col border-2 border-gray-500 rounded-md rounded-t-none">
        <textarea disabled className="w-full pl-1">
          {notification.body}
        </textarea>
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