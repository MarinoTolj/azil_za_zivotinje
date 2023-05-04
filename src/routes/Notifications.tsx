import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { INotification } from "../helpers/types";
import { todayInISOFormat } from "./AnimalRegistrationForm";
import { firestore } from "../firebase/firestore";
import Input from "../components/FormComponents/Input";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TextArea from "../components/FormComponents/TextArea";
import Notification from "../components/Notification";

function SortByDates(array: INotification[]) {
  return array.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

const Notifications = () => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [important, setImportant] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const fetchAllNotifications = async () => {
    await firestore.GetCollectionByName("notifications", setNotifications);
  };

  useEffect(() => {
    fetchAllNotifications();
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNotification: Omit<INotification, "id"> = {
      title,
      body,
      important,
      date: todayInISOFormat,
    };
    await firestore.AddDocument("notifications", newNotification);
    setTitle("");
    setBody("");
    setImportant(false);
    openCloseModal();
  };

  const openCloseModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="w-fit m-auto">
      <Modal open={openModal} openCloseModal={openCloseModal}>
        <form onSubmit={handleSubmit} className="">
          <Input
            label="Title: "
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            maxLength={20}
          />
          <TextArea
            label="Body: "
            onChange={(e) => setBody(e.target.value)}
            value={body}
            required
            minLength={20}
            maxLength={200}
          />
          {isAdmin && (
            <Input
              type="checkbox"
              label="Important: "
              checked={important}
              onChange={() => setImportant(!important)}
            />
          )}
          <Button className="mb-3">Save</Button>
        </form>
      </Modal>
      <Button onClick={openCloseModal} className="mt-3 mb-5">
        New Notification
      </Button>

      <h2 className="text-red-600 text-3xl ">Notifications: </h2>
      <div className="flex flex-col gap-4 w-fit m-auto mb-5">
        {SortByDates(notifications).map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
