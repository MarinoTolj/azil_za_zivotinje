import { useParams } from "react-router";
import { AdoptedStatus, IAnimal } from "../helpers/types";
import { useEffect, useState } from "react";
import AnimalImage from "../components/AnimalImage";
import ErrorPage from "../components/ErrorPage";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Modal from "../components/Modal";
import UpdateAnimal from "../components/UpdateAnimal";
import LoadingSpinner from "../components/Icons/LoadingSpinner";
import Button from "../components/Button";
import CheckMark from "../components/Icons/CheckMark";
import { Capitalize, SuccessMessage } from "../helpers/functions";
import TextArea from "../components/FormComponents/TextArea";
import axios from "../api/axios";

const AnimalInfo = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex gap-2">
      <p className="text-lg break-words break-normal">{title}</p>
      <p className="font-bold text-lg text-slate-600">{children}</p>
    </div>
  );
};

const Animal = () => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const params = useParams<"id">();
  const [animal, setAnimal] = useState<IAnimal | undefined>({
    adopted: "not adopted",
    age: 0,
    chipped: false,
    gender: "female",
    description: "",
    id: "",
    imageUrl: "",
    lastCheck: "",
    name: "",
    species: "",
  });
  const [editMode, setEditMode] = useState(false);

  const handleAdoption = async (status: AdoptedStatus) => {
    //TODO: 2nd route
    axios
      .patch(`/animals/${params.id}`, { adopted: status })
      .then(() => fetchAnimalById());
    SuccessMessage("Adoption Status Successfully Changed");
  };

  const fetchAnimalById = async () => {
    axios
      .get(`/animals/${params.id}`)
      .then((res) => {
        setAnimal(res.data);
      })
      .catch(() => setAnimal(undefined));
  };

  const handleOpenCloseModal = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    fetchAnimalById();
  }, [params]);

  if (animal === undefined) return <ErrorPage />;

  if (animal.name === "") return <LoadingSpinner />;
  return (
    <>
      <div className="w-fit max-w-2xl m-auto px-3 mb-40">
        <div className="flex flex-col items-start w-fit gap-4 mt-5 md:flex-row md:flex-wrap md:justify-center">
          <AnimalImage animal={animal} />
          <div className="flex flex-col gap-1">
            <AnimalInfo title="Name:">{animal.name}</AnimalInfo>
            <AnimalInfo title="Age:">{animal.age}</AnimalInfo>
            <AnimalInfo title="Gender:">{Capitalize(animal.gender)}</AnimalInfo>
            <AnimalInfo title="Chipped:">
              {<CheckMark check={animal.chipped} />}
            </AnimalInfo>
            <AnimalInfo title="Last Check:">
              <input type="date" value={animal.lastCheck} />
            </AnimalInfo>
            <AnimalInfo title="Species:">
              {Capitalize(animal.species)}
            </AnimalInfo>
            <AnimalInfo title="Status:">
              {animal.adopted === "adopted"
                ? "Adopted"
                : animal.adopted === "fostered"
                ? "Fostered"
                : "Not Adopted"}
            </AnimalInfo>
          </div>

          <div className="flex flex-col w-full basis-3/5">
            <TextArea
              label="Description:"
              value={animal.description}
              readOnly
              disabled
            />
            <div className="flex gap-4 justify-start mt-2">
              <Button
                onClick={() => handleAdoption("adopted")}
                hidden={animal.adopted !== "not adopted"}
                className="m-0 px-3"
              >
                Adopt
              </Button>
              <Button
                onClick={() => handleAdoption("fostered")}
                hidden={animal.adopted !== "not adopted"}
                className="m-0 px-3"
              >
                Foster
              </Button>

              <Button
                onClick={handleOpenCloseModal}
                hidden={!isAdmin}
                className="bg-main-orange m-0 px-3"
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={editMode} openCloseModal={handleOpenCloseModal}>
        <UpdateAnimal animal={animal} openCloseModal={handleOpenCloseModal} />
      </Modal>
    </>
  );
};
export default Animal;
