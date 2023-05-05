import { useState } from "react";
import Input from "./FormComponents/Input";
import { IAnimal } from "../helpers/types";
import { firestore } from "../firebase/firestore";
import { todayInISOFormat } from "../routes/AnimalRegistrationForm";
import TextArea from "./FormComponents/TextArea";
import Button from "./Button";
import Radio from "./FormComponents/Radio";

type PropType = {
  animal: IAnimal;
  openCloseModal: () => void;
};

const UpdateAnimal: React.FC<PropType> = (props) => {
  const [updatedAnimal, setUpdatedAnimal] = useState(props.animal);
  const [image, setImage] = useState<Blob>();

  const changeAnimal = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
      props.animal.id,
      updatedAnimal,
      image
    );
    props.openCloseModal();
  };

  return (
    <form
      className="w-5/6 m-auto h-full flex items-center flex-col"
      onSubmit={updateAnimal}
    >
      <Input
        label="Change Name: "
        name="name"
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
        onChange={changeAnimal}
      />
      <TextArea
        label="Description:"
        name="description"
        defaultValue={updatedAnimal.description}
        placeholder="Enter description"
        onChange={changeAnimal}
      />
      <Input
        label="Chipped?"
        type="checkbox"
        name="chipped"
        checked={updatedAnimal.chipped}
        className="ml-3"
        onChange={() =>
          setUpdatedAnimal((curr) => {
            return { ...curr, chipped: !curr.chipped };
          })
        }
      />
      <Radio
        label="Adopted"
        checked={updatedAnimal.adopted === "adopted"}
        name="adopted"
        value="adopted"
        onChange={changeAnimal}
      />
      <Radio
        label="Not Adopted"
        name="adopted"
        checked={updatedAnimal.adopted === "not adopted"}
        value="not adopted"
        onChange={changeAnimal}
      />
      <Radio
        label="Fostered"
        name="adopted"
        checked={updatedAnimal.adopted === "fostered"}
        value="fostered"
        onChange={changeAnimal}
      />

      <Input
        label="Last Check: "
        type="date"
        name="lastCheck"
        defaultValue={updatedAnimal.lastCheck}
        max={todayInISOFormat}
        onChange={changeAnimal}
      />
      <Input
        label="Upload Image"
        type="file"
        name="image"
        onChange={handleImageUpload}
      />
      <Button type="submit" className="my-3">
        Submit
      </Button>
    </form>
  );
};
export default UpdateAnimal;
