import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router";
import { db } from "../firebase/db";
import { IAnimal } from "../helpers/types";
import { useEffect, useState } from "react";
import AnimalImage from "../components/AnimalImage";

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

  const getAnimal = async () => {
    const data = await getDocs(
      query(collection(db, "animals"), where("name", "==", params.name))
    );

    const animals = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as IAnimal[];

    setAnimal(animals[0]);
  };

  useEffect(() => {
    getAnimal();
  }, [params]);

  console.log(params.name);
  //TODO: loading spinner
  if (animal.name === "") return <p>loading</p>;
  return (
    <div className="w-52 h-w-52 m-auto mt-5">
      <AnimalImage animal={animal} />
      <p>{animal.name}</p>
    </div>
  );
};
export default Animal;
