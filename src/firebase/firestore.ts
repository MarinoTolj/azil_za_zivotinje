import {
  addDoc,
  collection,
  doc,
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

const getAnimal = async (by: "name" | "id", value: string) => {
  const data = await getDocs(query(animalsRef, where(by, "==", value)));

  const animals = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as IAnimal[];
  return animals[0];
};

const updateAnimal = async (id: string, data: Partial<IAnimal>) => {
  const animalRef = doc(db, "animals", id);
  await updateDoc(animalRef, data);
};

export { uploadNewAnimal, getAnimal, updateAnimal };
