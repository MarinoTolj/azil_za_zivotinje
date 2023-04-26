import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchAllAnimals } from "../redux/animalsSlice";
import { useEffect, useState } from "react";
import AnimalImage from "../components/AnimalImage";
import Input from "../components/Input";
import { Species, species } from "../helpers/types";

const firstLetterToUppercase = (string: string) => {
  return string[0].toUpperCase() + string.slice(1);
};

const AllAnimals = () => {
  const animals = useSelector((state: RootState) => state.animals.animals);
  const dispatch = useDispatch<AppDispatch>();
  const [adoptedFilter, setAdoptedFilter] = useState<"All" | "true" | "false">(
    "All"
  );
  const [speciesFilter, setSpeciesFilter] = useState<Species | "All Species">(
    "All Species"
  );
  useEffect(() => {
    dispatch(fetchAllAnimals());
  }, []);

  useEffect(() => {
    console.log(speciesFilter);
  }, [speciesFilter]);

  return (
    <div className="md:flex md:gap-5 mt-5">
      <div className="md:flex md:flex-col">
        <h2 className="text-4xl">Filter: </h2>
        <div className="flex justify-center gap-2 my-5 md:flex-col">
          <h3>Adopted Status: </h3>
          <Input
            type="radio"
            name="adopted"
            label="All"
            value="All"
            checked={adoptedFilter === "All"}
            setValue={setAdoptedFilter}
          />
          <Input
            type="radio"
            name="adopted"
            label="Adopted"
            value="true"
            setValue={setAdoptedFilter}
          />
          <Input
            type="radio"
            name="adopted"
            label="Not Adopted"
            value="false"
            setValue={setAdoptedFilter}
          />
        </div>
        <div className="flex justify-center gap-2 my-5 md:flex-col">
          <h3>Species: </h3>
          <Input
            type="radio"
            name="species"
            label="All Species"
            value="All Species"
            checked={speciesFilter === "All Species"}
            setValue={setSpeciesFilter}
          />
          {species.map((specie) => {
            if (specie === "") return null;
            return (
              <Input
                key={specie}
                type="radio"
                name="species"
                label={firstLetterToUppercase(specie)}
                value={specie}
                setValue={setSpeciesFilter}
              />
            );
          })}
        </div>
      </div>
      <div
        className={`w-3/4 gap-5 grid max-w-3xl m-auto grid-cols-2 md:grid-cols-3`}
      >
        {animals.map((animal) => {
          return <AnimalImage key={animal.id} animal={animal} />;
        })}
      </div>
    </div>
  );
};
export default AllAnimals;
