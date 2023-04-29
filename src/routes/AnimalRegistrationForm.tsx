import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ErrorPage from "../components/ErrorPage";
import { useState } from "react";
import Input from "../components/FormComponents/Input";

import { Species } from "../helpers/types";
import SpeciesList from "../components/SpeciesList";
import { firestore } from "../firebase/firestore";
import { useNavigate } from "react-router";
import TextArea from "../components/FormComponents/TextArea";

/***
 * Format: yyyy-mm-dd
 * */
export const todayInISOFormat = new Date().toISOString().split("T")[0];

const AnimalRegistrationForm = () => {
  const [animalName, setAnimalName] = useState("");
  const [species, setSpecies] = useState<Species>("");
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");
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
    const data = {
      name: animalName,
      species,
      age,
      description,
      adopted: false,
      chipped,
      lastCheck,
    };
    if (image) {
      await firestore.AddDocument("animals", data, image);
      //TODO: decide what to do when form is submitted. It goes to all-animals, all-animals/:id, or it stays on same page with form input reseted
      //navigate("/all-animals");
    } else console.error("ERROR: Image not defined");
  };
  //TODO: custom error if not selected

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
        />

        <div className="flex gap-2  flex-wrap justify-center">
          <label className="basis-full">Species:</label>
          <div className="flex gap-4">
            <SpeciesList type="form" setValue={setSpecies} />
          </div>
        </div>
        <Input
          type="number"
          label="Animal age"
          placeholder="Type animal age"
          onChange={(e) => setAge(parseFloat(e.target.value))}
          required
        />

        <TextArea
          label="Description:"
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
        <Input
          label="Chipped?"
          type="checkbox"
          checked={chipped}
          className="ml-3"
          onChange={() => setChipped(!chipped)}
        />

        <Input
          label="Last Check: "
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
        <button
          type="submit"
          className="bg-green-600 w-fit p-3 rounded-md m-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AnimalRegistrationForm;
