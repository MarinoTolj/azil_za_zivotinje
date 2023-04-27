import React, { useEffect, useState } from "react";
import Input from "./Input";
import { IAnimal } from "../helpers/types";
import { todayInISOFormat } from "../routes/AnimalRegistrationForm";
import { firestore } from "../firebase/firestore";

type PropsType = { open: boolean; openCloseModal: () => void; animal: IAnimal };

const Modal = (props: PropsType) => {
  const [updatedAnimal, setUpdatedAnimal] = useState(props.animal);
  const [image, setImage] = useState<Blob>();

  const changeAnimal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const propety = e.currentTarget.name;
    const value = e.currentTarget.value;
    setUpdatedAnimal((curr) => {
      return { ...curr, [propety]: value };
    });
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  const updateAnimal = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await firestore.UpdateDocumentById(
      "animals",
      updatedAnimal,
      props.animal.id,
      image
    );
    props.openCloseModal();
  };
  return (
    <dialog
      className="w-full h-full z-20 bg-modal-transparent"
      open={props.open}
    >
      <div className="w-1/2 h-fit py-5 m-auto bg-white rounded-md">
        <span
          className="text-red-500 -mt-2 float-right text-3xl font-bold cursor-pointer"
          onClick={props.openCloseModal}
        >
          &times;
        </span>
        <form
          className="w-5/6 m-auto h-full flex items-center flex-col"
          onSubmit={updateAnimal}
        >
          <Input
            label="Change Name: "
            name="name"
            setValue={changeAnimal}
            defaultValue={updatedAnimal.name}
            className="border-2 border-black rounded-sm"
            onChange={changeAnimal}
          />
          <Input
            type="number"
            label="Animal age"
            name="age"
            defaultValue={updatedAnimal.age}
            placeholder="Type animal age"
            setValue={changeAnimal}
            onChange={changeAnimal}
          />

          <Input
            label="Description"
            textArea
            name="description"
            defaultValue={updatedAnimal.description}
            setValue={changeAnimal}
            placeholder="Enter description"
            onChange={changeAnimal}
          />
          <Input
            label="Chipped?"
            type="checkbox"
            name="chipped"
            checked={updatedAnimal.chipped}
            className="ml-3"
            setValue={changeAnimal}
            onChange={() =>
              setUpdatedAnimal((curr) => {
                return { ...curr, chipped: !curr.chipped };
              })
            }
          />
          <Input
            label="Adopted"
            type="checkbox"
            name="adopted"
            checked={updatedAnimal.adopted}
            className="ml-3"
            setValue={changeAnimal}
            onChange={() =>
              setUpdatedAnimal((curr) => {
                return { ...curr, adopted: !curr.adopted };
              })
            }
          />

          <Input
            label="Last Check: "
            type="date"
            name="lastCheck"
            defaultValue={updatedAnimal.lastCheck}
            max={todayInISOFormat}
            setValue={changeAnimal}
            onChange={changeAnimal}
          />
          <Input
            label="Upload Image"
            type="file"
            name="image"
            setValue={setImage}
            onChange={handleImageUpload}
          />
          <button
            type="submit"
            className="bg-green-600 w-fit p-3 rounded-md m-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default Modal;
