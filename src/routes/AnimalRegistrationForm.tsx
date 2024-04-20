import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ErrorPage from "../components/ErrorPage";
import { useState } from "react";
import Input from "../components/FormComponents/Input";
import CheckBox from "../components/FormComponents/CheckBox";

import { GenderType, IAnimal, Species } from "../helpers/types";
import SpeciesList from "../components/SpeciesList";
import { useNavigate } from "react-router";
import TextArea from "../components/FormComponents/TextArea";
import Button from "../components/Button";
import Radio from "../components/FormComponents/Radio";
import {
  ErrorMessage,
  SuccessMessage,
  todayInISOFormat,
} from "../helpers/functions";
import axios from "axios";
import { base_url } from "../main";

const AnimalRegistrationForm = () => {
  const [animalName, setAnimalName] = useState("");
  const [species, setSpecies] = useState<Species>("");
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState<GenderType>("female");
  const [chipped, setChipped] = useState(false);
  const [lastCheck, setLastCheck] = useState("");
  const [image, setImage] = useState<Blob>();
  const navigate = useNavigate();

  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  if (!isAdmin) return <ErrorPage />;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: Omit<IAnimal, "id" | "imageUrl"> = {
      name: animalName,
      species,
      age,
      gender,
      description,
      adopted: "not adopted",
      chipped,
      lastCheck,
    };
    if (image) {
      axios
        .post(`${base_url}/animals`, data);
      SuccessMessage("New Animal Successfully Added");
      navigate("/all-animals");
    } else ErrorMessage("ERROR: something went wrong. Try again");
  };

  return (
    <div className="text-center w-full m-auto mt-3">
      <form
        className="flex flex-col gap-5 w-fit m-auto"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Type animal name"
          label="Animal Name"
          required
          onChange={(e) => setAnimalName(e.target.value)}
          maxLength={20}
        />

        <div className="flex gap-1  flex-wrap justify-center">
          <label className="basis-full">Species:</label>
          <div className="flex gap-4">
            <SpeciesList
              type="form"
              onChange={(e) => setSpecies(e.target.value as Species)}
              defaultChecked={species === "" ? undefined : species}
            />
          </div>
        </div>
        <Input
          type="number"
          label="Animal age"
          placeholder="Type animal age"
          onChange={(e) => setAge(parseFloat(e.target.value))}
          step={0.1}
          min={0}
          required
        />
        <div className="flex gap-3 m-auto">
          <label htmlFor="">Select Gender:</label>
          <div>
            <Radio
              label="Male"
              value="male"
              onChange={(e) => setGender(e.target.value as GenderType)}
              name="gender"
            />
          </div>
          <div>
            <Radio
              label="Female"
              value="female"
              onChange={(e) => setGender(e.target.value as GenderType)}
              name="gender"
            />
          </div>
        </div>

        <TextArea
          label="Description"
          onChange={(e) => setDescription(e.currentTarget.value)}
        />

        <CheckBox
          label="Chipped?"
          checked={chipped}
          className="ml-2"
          onChange={() => setChipped(!chipped)}
        />

        <Input
          label="Last Check"
          type="date"
          max={todayInISOFormat}
          required
          onChange={(e) => setLastCheck(e.target.value)}
        />
        <Input
          label="Upload Image"
          type="file"
          required
          onChange={handleImageUpload}
          className=""
        />
        <Button type="submit" className="mb-5 w-3/4 mt-3">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AnimalRegistrationForm;
