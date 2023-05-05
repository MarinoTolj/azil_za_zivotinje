import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchAllAnimals } from "../redux/animalsSlice";
import { useEffect, useState } from "react";
import AnimalImage from "../components/AnimalImage";
import Input from "../components/FormComponents/Input";
import { AdoptedStatus, IAnimal, Species } from "../helpers/types";
import SpeciesList from "../components/SpeciesList";
import Radio from "../components/FormComponents/Radio";
import { firestore } from "../firebase/firestore";
import LoadingSpinner from "../components/Icons/LoadingSpinner";
import CheckBox from "../components/Icons/CheckBox";

const isStringBoolean = (string: string) => {
  if (string === "true") return true;
  else if (string === "false") return false;
  return undefined;
};

type AdoptedType = AdoptedStatus | "All";

const AllAnimals = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [filtredAnimals, setFiltredAnimals] = useState(animals);
  const [adoptedFilter, setAdoptedFilter] = useState<AdoptedType>("All");
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
            animal.adopted === adoptedFilter && searchRegex.test(animal.name)
        )
      );
    else
      setFiltredAnimals(
        animals.filter(
          (animal) =>
            animal.adopted === adoptedFilter &&
            animal.species === speciesFilter &&
            searchRegex.test(animal.name)
        )
      );
  }, [speciesFilter, adoptedFilter, animals, searchTerm]);

  if (animals === null) return <LoadingSpinner />;

  return (
    <div className="flex flex-col items-center md:flex-row md:gap-5 mt-5 md:ml-10">
      <div className="md:flex md:flex-col">
        <Input
          label="Search by name:"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-black rounded-sm mb-3 ml-2 md:ml-0"
        />
        <h2 className="text-4xl">Filter: </h2>
        <div className="flex gap-3 md:flex-col">
          <div className="flex">
            <span>
              <CheckBox className="text-adopted" />
            </span>
            <p>Adopted</p>
          </div>
          <div className="flex">
            <span>
              <CheckBox className="text-fostered" />
            </span>
            <p>Fostered</p>
          </div>
          <div className="flex">
            <span>
              <CheckBox className="text-not-adopted" />
            </span>
            <p>Not Adopted</p>
          </div>
        </div>
        <div className="flex justify-center gap-2 my-5 md:flex-col">
          <h3>Adopted Status: </h3>
          <div>
            <Radio
              name="adopted"
              label="All"
              value="All"
              checked={adoptedFilter === "All"}
              onChange={(e) => setAdoptedFilter(e.target.value as AdoptedType)}
            />
          </div>
          <div>
            <Radio
              name="adopted"
              label="Adopted"
              value="adopted"
              onChange={(e) => setAdoptedFilter(e.target.value as AdoptedType)}
            />
          </div>
          <div>
            <Radio
              name="adopted"
              label="Not Adopted"
              value="not adopted"
              onChange={(e) => setAdoptedFilter(e.target.value as AdoptedType)}
            />
          </div>
          <div>
            <Radio
              name="adopted"
              label="Fostered"
              value="fostered"
              onChange={(e) => setAdoptedFilter(e.target.value as AdoptedType)}
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
              onChange={(e) => setSpeciesFilter(e.target.value as Species)}
            />
          </div>

          <SpeciesList
            type="filter"
            onChange={(e) => setSpeciesFilter(e.target.value as Species)}
          />
        </div>
      </div>

      <div
        className={`mb-5 gap-5 grid max-w-5xl md:self-start md:flex-grow grid-cols-1 sm:grid-cols-2 md:grid-cols-3`}
      >
        {filtredAnimals.map((animal) => {
          return <AnimalImage key={animal.id} animal={animal} />;
        })}
      </div>
    </div>
  );
};
export default AllAnimals;
