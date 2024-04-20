import { useEffect, useState } from "react";
import AnimalImage from "../components/AnimalImage";
import Input from "../components/FormComponents/Input";
import { AdoptedStatus, IAnimal, Species } from "../helpers/types";
import SpeciesList from "../components/SpeciesList";
import Radio from "../components/FormComponents/Radio";
import LoadingSpinner from "../components/Icons/LoadingSpinner";
import Legend from "../components/Icons/Legend";
import AdoptedList from "../components/FormComponents/AdoptedList";
import axios from "axios";
import { base_url } from "../main";

type AdoptedType = AdoptedStatus | "All";

const AllAnimals = () => {
  const [animals, setAnimals] = useState<IAnimal[]>();
  const [filtredAnimals, setFiltredAnimals] = useState(animals);
  const [adoptedFilter, setAdoptedFilter] = useState<AdoptedType>("All");
  const [speciesFilter, setSpeciesFilter] = useState<Species | "All Species">(
    "All Species"
  );

  const [searchTerm, setSearchTerm] = useState("");

  const getAnimals = async () => {
    axios
        .get(`${base_url}/animals/`)
        .then((res) =>
          setAnimals(res.data)
        );
  };

  useEffect(() => {
    getAnimals();
  }, []);

  useEffect(() => {
    if (animals === undefined) return;
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

  if (animals === undefined || filtredAnimals === undefined)
    return <LoadingSpinner />;

  return (
    <div className="flex flex-col my-10 items-center md:flex-row md:gap-5 md:ml-10">
      <div className="md:flex md:flex-col gap-3">
        <div className="relative">
          <Input
            label="Search by name:"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span
            className="text-red-500 absolute right-0 top-1/3  text-3xl font-bold cursor-pointer"
            onClick={() => setSearchTerm("")}
          >
            &times;
          </span>
        </div>
        <div className="flex gap-3 my-5 md:flex-col">
          <div className="flex">
            <span>
              <Legend className="text-adopted" />
            </span>
            <p>Adopted</p>
          </div>
          <div className="flex">
            <span>
              <Legend className="text-fostered" />
            </span>
            <p>Fostered</p>
          </div>
          <div className="flex">
            <span>
              <Legend className="text-not-adopted" />
            </span>
            <p>Not Adopted</p>
          </div>
        </div>
        <h2 className="text-4xl">Filter: </h2>
        <div className="flex flex-col justify-center mb-5 md:flex-col">
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

          <AdoptedList
            setterFunction={(e) =>
              setAdoptedFilter(e.target.value as AdoptedType)
            }
            defaultCheck={adoptedFilter}
          />
        </div>
        <div className="flex justify-center gap-2 md:flex-col">
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
        className={`grid gap-5 mx-2  max-w-5xl md:self-start md:flex-grow grid-cols-1 sm:grid-cols-2 md:grid-cols-3`}
      >
        {filtredAnimals.map((animal) => {
          return <AnimalImage key={animal.id} animal={animal} />;
        })}
      </div>
    </div>
  );
};
export default AllAnimals;
