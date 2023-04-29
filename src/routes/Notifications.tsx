import React, { useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { INotification } from "../helpers/types";
import { todayInISOFormat } from "./AnimalRegistrationForm";
import { firestore } from "../firebase/firestore";
import Input from "../components/FormComponents/Input";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TextArea from "../components/FormComponents/TextArea";

const Notifications = () => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [important, setImportant] = useState(false);

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
    <div>
      <Button onClick={openCloseModal}>New Notification</Button>
      <Modal open={openModal} openCloseModal={openCloseModal}>
        <form onSubmit={handleSubmit}>
          <Input
            label="Title: "
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
          <TextArea
            label="Body: "
            onChange={(e) => setBody(e.target.value)}
            value={body}
            required
          />
          {isAdmin && (
            <Input
              type="checkbox"
              label="Important: "
              checked={important}
              onChange={() => setImportant(!important)}
            />
          )}
          <Button>Save</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Notifications;
