import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/db";

import {
  FirebaseStorage,
  UploadMetadata,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { IAnimal, INotification } from "../helpers/types";

type Collections = "animals" | "notifications" | "donations";
type PossibleDataType =
  | Omit<IAnimal, "id" | "imageUrl">
  | Omit<INotification, "id">;
class FiresStore {
  collections: { [key in Collections]: CollectionReference<DocumentData> } = {
    animals: collection(db, "animals"),
    notifications: collection(db, "notifications"),
    donations: collection(db, "donations"),
  };
  storage = getStorage();

  /* constructor() {

  } */

  async GetCollectionByName<T>(
    collectionName: Collections,
    setterFunction?: React.Dispatch<React.SetStateAction<T>>
  ) {
    /* const q = query(this.collections[collectionName]);

    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id };
        setterFunction((curr) => [...(curr as T[]), data] as T);
      });
    });
    return unsub; */
    const collectionData = await getDocs(
      query(this.collections[collectionName])
    );
    const data = collectionData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as T;
    return data;
  }

  async GetDocumentById<T>(
    collectionName: Collections,
    id: string,
    setterFunction: React.Dispatch<React.SetStateAction<T>>
  ) {
    const documentRef = doc(db, collectionName, id);
    const unsub = onSnapshot(documentRef, (doc) => {
      setterFunction({ ...doc.data(), id: doc.id } as T);
    });

    return unsub;
  }

  async AddDocument(
    collectionName: Collections,
    data: PossibleDataType,
    image?: Blob
  ) {
    if (image) {
      const storageRef = ref(this.storage, `images/${image.name}`);
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
            await addDoc(this.collections[collectionName], {
              ...data,
              imageUrl: downloadURL,
            });
          });
        }
      );
    } else {
      await addDoc(this.collections[collectionName], data);
    }
  }

  async UpdateDocumentById(
    collectionName: Collections,
    data: Partial<PossibleDataType>,
    id: string,
    image?: Blob
  ) {
    const documentRef = doc(db, collectionName, id);
    if (image) {
      const storageRef = ref(this.storage, `images/${image.name}`);
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
            await updateDoc(documentRef, {
              ...data,
              imageUrl: downloadURL,
            });
          });
        }
      );
    } else {
      await updateDoc(documentRef, data);
    }
  }
}

const firestore = new FiresStore();

const updateAnimalById = async (
  id: string,
  data: Partial<IAnimal>,
  image?: Blob
) => {
  const animalRef = doc(db, "animals", id);
  /* if (!image) {
    await updateDoc(animalRef, data);
  } else {
    const storageRef = ref(storage, `images/${image.name}`);

    const uploadTask = uploadBytesResumable(
      storageRef,
      image,
      "data_url" as UploadMetadata
    );
    
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
  } */
};

export { firestore };
