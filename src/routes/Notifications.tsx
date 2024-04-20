import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { INotification } from "../helpers/types";
import Input from "../components/FormComponents/Input";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TextArea from "../components/FormComponents/TextArea";
import CheckBox from "../components/FormComponents/CheckBox";
import Notification from "../components/Notification";
import LoadingSpinner from "../components/Icons/LoadingSpinner";
import {
  SortByDates,
  SuccessMessage,
  todayInISOFormat,
} from "../helpers/functions";
import axios from "axios";
import { base_url } from "../main";

const Notifications = () => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [important, setImportant] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>();
  const [showImportant, setShowImportant] = useState(false);

  const fetchAllNotifications = async () => {
    axios
        .get(`${base_url}/notifications/`).then((res)=>setNotifications(res.data));
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
    axios
        .post(`${base_url}/notifications/`, newNotification);
    setTitle("");
    setBody("");
    setImportant(false);
    openCloseModal();
    SuccessMessage("New Notification Successfully Added");
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
      <div className="m-auto mt-5 w-full max-w-2xl px-3">
        <Button onClick={openCloseModal} className="mb-5 max-w-xs">
          New Notification
        </Button>

        <h2 className="text-red-600 text-4xl">Notifications: </h2>
        <CheckBox
          label="Only Show Important"
          onChange={() => setShowImportant(!showImportant)}
          className="ml-3 mb-5"
        />

        <div className="flex flex-col gap-4 m-auto mb-5">
          {showImportant
            ? SortByDates(notifications)
                .filter((notification) => notification.important)
                .map((notification) => (
                  <Notification
                    key={notification.id}
                    notification={notification}
                  />
                ))
            : SortByDates(notifications).map((notification) => (
                <Notification
                  key={notification.id}
                  notification={notification}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default Notifications;
