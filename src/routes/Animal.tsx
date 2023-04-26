import { useParams } from "react-router";
import { IAnimal } from "../helpers/types";
import { useEffect, useState } from "react";
import AnimalImage from "../components/AnimalImage";
import ErrorPage from "../components/ErrorPage";
import { updateAnimal, getAnimal } from "../firebase/firestore";

const Animal = () => {
  const params = useParams<"name">();
  const [animal, setAnimal] = useState<IAnimal>({
    adopted: false,
    age: 0,
    chipped: false,
    description: "",
    id: "",
    imageUrl: "",
    lastCheck: "",
    name: "",
    species: "",
  });

  const handleAdoption = async () => {
    await updateAnimal(animal.id, { adopted: true });
  };

  const getAnimalByName = async () => {
    if (params.name) {
      const animal = await getAnimal("name", params.name);
      setAnimal(animal);
    }
  };

  useEffect(() => {
    getAnimalByName();
  }, [params]);

  console.log(params.name);
  if (animal === undefined) return <ErrorPage />;
  //TODO: loading spinner
  if (animal.name === "") return <p>loading</p>;
  return (
    <div className="w-52 h-w-52 m-auto mt-5">
      <AnimalImage animal={animal} />
      <p>{animal.name}</p>
      <div>Status: {animal.adopted ? "Adopted" : "Not Adopted"}</div>
      <button onClick={handleAdoption} hidden={animal.adopted}>
        Adopt
      </button>
    </div>
  );
};
export default Animal;
