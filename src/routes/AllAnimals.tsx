import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchAllAnimals } from "../redux/animalsSlice";
import { useEffect, useState } from "react";
import AnimalImage from "../components/AnimalImage";
import Input from "../components/Input";
import { Species } from "../helpers/types";
import SpeciesList from "../components/SpeciesList";

const isStringBoolean = (string: string) => {
  if (string === "true") return true;
  else if (string === "false") return false;
  return undefined;
};

const AllAnimals = () => {
  const animals = useSelector((state: RootState) => state.animals.animals);
  const [filtredAnimals, setFiltredAnimals] = useState(animals);
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
    if (speciesFilter === "All Species" && adoptedFilter === "All")
      setFiltredAnimals(animals);
    else if (adoptedFilter === "All")
      setFiltredAnimals(
        animals.filter((animal) => animal.species === speciesFilter)
      );
    else if (speciesFilter === "All Species")
      setFiltredAnimals(
        animals.filter(
          (animal) => animal.adopted === isStringBoolean(adoptedFilter)
        )
      );
    else
      setFiltredAnimals(
        animals.filter(
          (animal) =>
            animal.adopted === isStringBoolean(adoptedFilter) &&
            animal.species === speciesFilter
        )
      );
  }, [speciesFilter, adoptedFilter, animals]);

  return (
    <div className="md:flex md:gap-5 mt-5 md:ml-10">
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
          <SpeciesList type="filter" setValue={setSpeciesFilter} />
        </div>
      </div>
      <div
        className={`w-3/4 gap-5 grid max-w-3xl m-auto grid-cols-2 md:grid-cols-3`}
      >
        {filtredAnimals.map((animal) => {
          return <AnimalImage key={animal.id} animal={animal} />;
        })}
      </div>
    </div>
  );
};
export default AllAnimals;
