import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ErrorPage from "../components/ErrorPage";
import { useEffect, useState } from "react";
import Input from "../components/Input";

import { Species } from "../helpers/types";
import SpeciesList from "../components/SpeciesList";
import { uploadNewAnimal } from "../firebase/firestore";

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
    if (image) uploadNewAnimal(data, image);
    else console.error("ERROR: Image not defined");
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
          setValue={setAnimalName}
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
          setValue={setAge}
          required
        />

        <Input
          label="Description"
          textArea
          setValue={setDescription}
          placeholder="Enter description"
        />
        <Input
          label="Chipped?"
          type="checkbox"
          checked={chipped}
          className="ml-3"
          setValue={setChipped}
          onChange={() => setChipped(!chipped)}
        />

        <Input
          label="Last Check: "
          type="date"
          max={todayInISOFormat}
          required
          setValue={setLastCheck}
        />
        <Input
          label="Upload Image"
          type="file"
          required
          setValue={setImage}
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
