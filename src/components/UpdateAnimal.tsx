import { useState } from "react";
import Input from "./FormComponents/Input";
import { FormType, IAnimal, InputType } from "../helpers/types";
import TextArea from "./FormComponents/TextArea";
import Button from "./Button";
import CheckBox from "./FormComponents/CheckBox";
import AdoptedList from "./FormComponents/AdoptedList";
import {
  ErrorMessage,
  SuccessMessage,
  todayInISOFormat,
} from "../helpers/functions";
import Radio from "./FormComponents/Radio";
import { useNavigate, useParams } from "react-router";
import SpeciesList from "./SpeciesList";
import axios, { axiosProtected } from "../api/axios";

type PropType = {
  animal: IAnimal;
  openCloseModal: () => void;
  fetchAnimal: () => void;
};

const UpdateAnimal: React.FC<PropType> = (props) => {
  const [updatedAnimal, setUpdatedAnimal] = useState({ ...props.animal });
  const [image, setImage] = useState<File>();
  const navigate = useNavigate();
  const params = useParams<"id">();

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

    const data = { ...updatedAnimal, image };
    try {
      await axios.patch(`/animals/${params.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      props.openCloseModal();
      SuccessMessage(
        `${updatedAnimal.name}'s information successfully changed`
      );
      props.fetchAnimal();
    } catch (error) {
      ErrorMessage("An error has occured");
    }
  };

  const deleteAnimal = async () => {
    const response = confirm(
      "Are you sure you want to remove?\n- " + updatedAnimal.name
    );
    if (response) {
      try {
        await axiosProtected.delete(`/animals/${params.id}`);
        navigate("/all-animals");
      } catch (error) {
        ErrorMessage("An error has occured");
      }
    }
  };

  return (
    <form
      className="w-5/6 m-auto h-full flex items-center flex-col gap-3 py-3"
      onSubmit={updateAnimal}
    >
      <Input
        label="Change Name"
        name="name"
        defaultValue={updatedAnimal.name}
        onChange={changeAnimal}
      />
      <div className="flex gap-4">
        {
          <SpeciesList
            type="form"
            onChange={changeAnimal}
            defaultChecked={updatedAnimal.species}
          />
        }
      </div>
      <Input
        type="number"
        label="Animal age"
        name="age"
        defaultValue={updatedAnimal.age}
        placeholder="Type animal age"
        onChange={changeAnimal}
      />
      <div className="flex gap-1 md:gap-3 m-auto">
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
        accept="image/*"
        name="image"
        className=" "
        onChange={handleImageUpload}
      />
      <div className="flex gap-3 w-full">
        <Button
          type="button"
          onClick={deleteAnimal}
          className="bg-red-600 whitespace-nowrap px-3"
        >
          Delete
        </Button>
        <Button type="submit" className="">
          Edit
        </Button>
      </div>
    </form>
  );
};
export default UpdateAnimal;
