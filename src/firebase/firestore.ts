import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/db";

import {
  UploadMetadata,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { IAnimal } from "../helpers/types";

const animalsRef = collection(db, "animals");
const storage = getStorage();

const uploadNewAnimal = (
  data: Omit<IAnimal, "imageUrl" | "id">,
  image: Blob
) => {
  const storageRef = ref(storage, `images/${image.name}`);

  const uploadTask = uploadBytesResumable(
    storageRef,
    image,
    "data_url" as UploadMetadata
  );
  //TODO: Snapshot
  /*(snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },*/
  uploadTask.on(
    "state_changed",
    (snapshot) => void 0,
    (error) => console.error(error),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        await addDoc(animalsRef, { ...data, imageUrl: downloadURL });
      });
    }
  );
};

const getAnimalById = async (id: string) => {
  const animalRef = doc(db, "animals", id);
  const animalDoc = await getDoc(animalRef);
  const animal = { ...animalDoc.data(), id: animalDoc.id } as IAnimal;
  return animal;
};

const updateAnimalById = async (
  id: string,
  data: Partial<IAnimal>,
  image?: Blob
) => {
  const animalRef = doc(db, "animals", id);
  if (!image) {
    await updateDoc(animalRef, data);
  } else {
    const storageRef = ref(storage, `images/${image.name}`);

    const uploadTask = uploadBytesResumable(
      storageRef,
      image,
      "data_url" as UploadMetadata
    );
    //TODO: Snapshot
    /*(snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },*/
    uploadTask.on(
      "state_changed",
      (snapshot) => void 0,
      (error) => console.error(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(animalRef, { ...data, imageUrl: downloadURL });
        });
      }
    );
  }
};

export { uploadNewAnimal, getAnimalById, updateAnimalById };
