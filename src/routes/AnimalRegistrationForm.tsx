import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ErrorPage from "../components/ErrorPage";
import { useEffect, useState } from "react";
import Input from "../components/Input";

import { Species } from "../helpers/types";
import SpeciesList from "../components/SpeciesList";
import { uploadNewAnimal } from "../firebase/firestore";

//Format: yyyy-mm-dd
const todayInISOFormat = new Date().toISOString().split("T")[0];

const AnimalRegistrationForm = () => {
  const [animalName, setAnimalName] = useState("");
  const [species, setSpecies] = useState<Species>("");
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");
  const [chipped, setChipped] = useState(false);
  const [lastCheck, setLastCheck] = useState("");
  const [image, setImage] = useState<Blob>();

  useEffect(() => {
    console.log(chipped);
  }, [chipped]);

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

  return (
    <div className="text-center w-60 m-auto mt-3">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <Input
          placeholder="Type animal name"
          className="border-2 border-black rounded-sm"
          label="Animal Name"
          required
          setValue={setAnimalName}
        />

        <div className="flex gap-2  flex-wrap justify-center">
          <label className="basis-full">Species:</label>
          <SpeciesList type="form" setValue={setSpecies} />
        </div>
        <Input
          type="number"
          label="Animal age"
          className="border-2 border-black rounded-sm"
          placeholder="Type animal age"
          setValue={setAge}
          required
        />

        <Input
          label="Description"
          textArea
          setValue={setDescription}
          className="border-2 border-black rounded-sm"
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
          className="border-2 border-black rounded-md"
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
