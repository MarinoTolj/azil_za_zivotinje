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
    //await updateAnimalById(animal.id, { adopted: true });
    await firestore.UpdateDocumentById("animals", { adopted: true }, animal.id);
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
  //TODO: loading spinner
  if (animal.name === "") return <p>loading</p>;
  return (
    <div className="flex flex-col max-w-sm m-auto">
      <div className="flex justify-center gap-3 m-auto mt-5">
        <AnimalImage animal={animal} />
        <div>
          <p className="text-lg">Name: {animal.name}</p>
          <p className="text-lg">Age: {animal.age}</p>
          {/*TODO: icon for cipped status */}
          <p className="text-lg">
            Chipped: {animal.chipped ? "Chipped" : "Not Chipped"}
          </p>
          <p className="text-lg">Last Check: {animal.lastCheck}</p>
          <p>Species: {animal.species}</p>
          <div>Status: {animal.adopted ? "Adopted" : "Not Adopted"}</div>
        </div>
      </div>

      <div className="flex flex-col justify-center mt-5">
        <p>Description:</p>
        <textarea
          disabled
          defaultValue={animal.description}
          className="border-2 border-black rounded-md mt-2"
        />
        <div className="flex gap-5 justify-between mt-8">
          <button
            onClick={handleAdoption}
            hidden={animal.adopted}
            className="bg-green-600 w-fit p-3 rounded-md m-auto"
          >
            Adopt
          </button>

          <button
            onClick={handleOpenCloseModal}
            hidden={!isAdmin}
            className="bg-orange-400 w-fit p-3 rounded-md m-auto"
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
