import { useState } from "react";
import Input from "./FormComponents/Input";
import { FormType, IAnimal, InputType } from "../helpers/types";
import { firestore } from "../firebase/firestore";
import TextArea from "./FormComponents/TextArea";
import Button from "./Button";
import CheckBox from "./FormComponents/CheckBox";
import AdoptedList from "./FormComponents/AdoptedList";
import { SuccessMessage, todayInISOFormat } from "../helpers/functions";
import Radio from "./FormComponents/Radio";
import { useNavigate } from "react-router";

type PropType = {
  animal: IAnimal;
  openCloseModal: () => void;
};

const UpdateAnimal: React.FC<PropType> = (props) => {
  const [updatedAnimal, setUpdatedAnimal] = useState({ ...props.animal });
  const [image, setImage] = useState<Blob>();
  const navigate = useNavigate();

  const changeAnimal = (e: InputType) => {
    const propety = e.currentTarget.name;
    const value = e.currentTarget.value;
    setUpdatedAnimal((curr) => {
      return { ...curr, [propety]: value };
    });
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  const updateAnimal = async (e: FormType) => {
    e.preventDefault();
    await firestore.UpdateDocumentById(
      "animals",
      props.animal.id,
      updatedAnimal,
      image
    );
    props.openCloseModal();
    SuccessMessage(`${updatedAnimal.name} information successfully changed`);
  };

  const deleteAnimal = async () => {
    const response = confirm(
      "Are you sure you want to remove: " + props.animal.name
    );
    if (response) {
      await firestore.DeleteDocumentById("animals", props.animal.id);
      navigate("/all-animals");
    }
  };

  return (
    <form
      className="w-5/6 m-auto h-full flex items-center flex-col gap-3 pt-3"
      onSubmit={updateAnimal}
    >
      <Input
        label="Change Name"
        name="name"
        defaultValue={updatedAnimal.name}
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
      <div className="flex gap-3 m-auto">
        <label htmlFor="">Select Gender:</label>
        <div>
          <Radio
            label="Male"
            value="male"
            checked={updatedAnimal.gender === "male"}
            onChange={changeAnimal}
            name="gender"
          />
        </div>
        <div>
          <Radio
            label="Female"
            value="female"
            checked={updatedAnimal.gender === "female"}
            onChange={changeAnimal}
            name="gender"
          />
        </div>
      </div>
      <TextArea
        label="Description"
        name="description"
        defaultValue={updatedAnimal.description}
        placeholder="Enter description"
        onChange={changeAnimal}
      />
      <CheckBox
        label="Chipped?"
        name="chipped"
        checked={updatedAnimal.chipped}
        className="ml-3"
        onChange={() =>
          setUpdatedAnimal((curr) => {
            return { ...curr, chipped: !curr.chipped };
          })
        }
      />
      <div>
        <label className="mb-1">Adoption Status:</label>
        <AdoptedList
          defaultCheck={updatedAnimal.adopted}
          setterFunction={changeAnimal}
        />
      </div>
      <Input
        label="Last Check"
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
        className=" "
        onChange={handleImageUpload}
      />
      <Button type="submit" className="mb-3 mt-5">
        Submit
      </Button>
      <Button type="button" onClick={deleteAnimal} className="mb-3 bg-red-600">
        Remove animal from database
      </Button>
    </form>
  );
};
export default UpdateAnimal;
