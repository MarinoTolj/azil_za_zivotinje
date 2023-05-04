import { useParams } from "react-router";
import { IAnimal } from "../helpers/types";
import { useEffect, useState } from "react";
import AnimalImage from "../components/AnimalImage";
import ErrorPage from "../components/ErrorPage";
import { firestore } from "../firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Modal from "../components/Modal";
import UpdateAnimal from "../components/UpdateAnimal";
import LoadingSpinner from "../components/Icons/LoadingSpinner";
import Button from "../components/Button";
import CheckMark from "../components/Icons/CheckMark";
import { Capitalize } from "../helpers/functions";

const AnimalInfo = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <p className="underline italic">{title}</p>
      <p className="font-bold text-xl text-slate-600">{children}</p>
    </div>
  );
};

const Animal = () => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const params = useParams<"id">();
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
  const [editMode, setEditMode] = useState(false);

  const handleAdoption = async () => {
    await firestore.UpdateDocumentById("animals", animal.id, { adopted: true });
  };

  const fetchAnimalById = async () => {
    if (params.id)
      await firestore.GetDocumentById<IAnimal>("animals", params.id, setAnimal);
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
    <div className="flex flex-col max-w-sm m-auto">
      <div className="flex justify-center gap-3 mt-5 mx-3">
        <AnimalImage animal={animal} />
        <div className="flex flex-col gap-1">
          <AnimalInfo title="Name:">{animal.name}</AnimalInfo>
          <AnimalInfo title="Age:">{animal.age}</AnimalInfo>
          <AnimalInfo title="Chipped:">
            {<CheckMark check={animal.chipped} />}
          </AnimalInfo>
          <AnimalInfo title="Last Check:">
            <input type="date" value={animal.lastCheck} />
          </AnimalInfo>
          <AnimalInfo title="Species:">{Capitalize(animal.species)}</AnimalInfo>
          <AnimalInfo title="Status:">
            {animal.adopted ? "Adopted" : "Not Adopted"}
          </AnimalInfo>
        </div>
      </div>

      <div className="flex flex-col my-5 mx-3">
        <p>Description:</p>
        <textarea
          disabled
          value={animal.description}
          className="border-2 border-black rounded-md mt-2"
        />
        <div className="flex gap-5 justify-between mt-8">
          <Button onClick={handleAdoption} hidden={animal.adopted}>
            Adopt
          </Button>

          <button
            onClick={handleOpenCloseModal}
            hidden={!isAdmin}
            className="bg-main-orange text-white w-fit p-3 rounded-md m-auto"
          >
            Edit
          </button>
        </div>
      </div>

      <Modal open={editMode} openCloseModal={handleOpenCloseModal}>
        <UpdateAnimal animal={animal} openCloseModal={handleOpenCloseModal} />
      </Modal>
    </div>
  );
};
export default Animal;
