import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchAllAnimals } from "../redux/animalsSlice";
import { useEffect, useState } from "react";
import AnimalImage from "../components/AnimalImage";
import Input from "../components/Input";
import { IAnimal, Species } from "../helpers/types";
import SpeciesList from "../components/SpeciesList";
import Radio from "../components/Radio";
import { firestore } from "../firebase/firestore";

const isStringBoolean = (string: string) => {
  if (string === "true") return true;
  else if (string === "false") return false;
  return undefined;
};

const AllAnimals = () => {
  //const animals = useSelector((state: RootState) => state.animals.animals);
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [filtredAnimals, setFiltredAnimals] = useState(animals);
  const dispatch = useDispatch<AppDispatch>();
  const [adoptedFilter, setAdoptedFilter] = useState<"All" | "true" | "false">(
    "All"
  );
  const [speciesFilter, setSpeciesFilter] = useState<Species | "All Species">(
    "All Species"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const getAnimals = async () => {
    await firestore.GetCollectionByName("animals", setAnimals);
  };

  useEffect(() => {
    getAnimals();
  }, []);

  useEffect(() => {
    let searchRegex = /.*/;
    if (searchTerm !== "") searchRegex = new RegExp(searchTerm, "i");

    if (speciesFilter === "All Species" && adoptedFilter === "All")
      setFiltredAnimals(
        animals.filter((animal) => searchRegex.test(animal.name))
      );
    else if (adoptedFilter === "All")
      setFiltredAnimals(
        animals.filter(
          (animal) =>
            animal.species === speciesFilter && searchRegex.test(animal.name)
        )
      );
    else if (speciesFilter === "All Species")
      setFiltredAnimals(
        animals.filter(
          (animal) =>
            animal.adopted === isStringBoolean(adoptedFilter) &&
            searchRegex.test(animal.name)
        )
      );
    else
      setFiltredAnimals(
        animals.filter(
          (animal) =>
            animal.adopted === isStringBoolean(adoptedFilter) &&
            animal.species === speciesFilter &&
            searchRegex.test(animal.name)
        )
      );
  }, [speciesFilter, adoptedFilter, animals, searchTerm]);

  return (
    <div className="md:flex md:gap-5 mt-5 md:ml-10">
      <div className="md:flex md:flex-col">
        <Input
          label="Search by name:"
          setValue={setSearchTerm}
          className="border-2 border-black rounded-sm mb-3 ml-2 md:ml-0"
        />
        <h2 className="text-4xl">Filter: </h2>
        <div className="flex justify-center gap-2 my-5 md:flex-col">
          <h3>Adopted Status: </h3>
          <div>
            <Radio
              name="adopted"
              label="All"
              value="All"
              checked={adoptedFilter === "All"}
              setValue={setAdoptedFilter}
            />
          </div>
          <div>
            <Radio
              name="adopted"
              label="Adopted"
              value="true"
              setValue={setAdoptedFilter}
            />
          </div>
          <div>
            <Radio
              name="adopted"
              label="Not Adopted"
              value="false"
              setValue={setAdoptedFilter}
            />
          </div>
        </div>
        <div className="flex justify-center gap-2 my-5 md:flex-col">
          <h3>Species: </h3>

          <div className="hidden md:block">
            <Radio
              name="species"
              label="All species"
              value="All Species"
              checked={speciesFilter === "All Species"}
              setValue={setSpeciesFilter}
            />
          </div>

          <SpeciesList type="filter" setValue={setSpeciesFilter} />
        </div>
      </div>

      <div
        className={`w-3/4 gap-5 grid max-w-3xl m-auto grid-rows-2 h-auto grid-cols-1 md:grid-cols-3`}
      >
        {filtredAnimals.map((animal) => {
          return <AnimalImage key={animal.id} animal={animal} />;
        })}
      </div>
    </div>
  );
};
export default AllAnimals;
