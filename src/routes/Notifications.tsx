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
import CheckBox from "../components/FormComponents/CheckBox";
import Notification from "../components/Notification";
import LoadingSpinner from "../components/Icons/LoadingSpinner";
import { SortByDates } from "../helpers/functions";

const Notifications = () => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [important, setImportant] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>();
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

  if (notifications === undefined) return <LoadingSpinner />;

  return (
    <>
      <Modal isOpen={openModal} openCloseModal={openCloseModal}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 pt-2 ">
          <Input
            label="Title: "
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            placeholder="Enter title"
            maxLength={20}
          />
          <TextArea
            label="Body: "
            onChange={(e) => setBody(e.target.value)}
            value={body}
            required
            placeholder="Enter content"
            minLength={20}
            maxLength={200}
          />
          {isAdmin && (
            <CheckBox
              label="Important: "
              checked={important}
              className="ml-2"
              onChange={() => setImportant(!important)}
            />
          )}
          <Button className="mb-3 mt-4 w-3/4">Save</Button>
        </form>
      </Modal>
      <div className="m-auto mt-5">
        <Button onClick={openCloseModal} className="mb-5">
          New Notification
        </Button>

        <h2 className="text-red-600 text-4xl mb-2">Notifications: </h2>
        <div className="flex flex-col gap-4 w-fit m-auto mb-5">
          {SortByDates(notifications).map((notification) => (
            <Notification key={notification.id} notification={notification} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Notifications;
