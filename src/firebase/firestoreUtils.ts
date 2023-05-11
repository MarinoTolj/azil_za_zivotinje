import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "./db";

import {
  UploadMetadata,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { IAnimal, IDonation, INotification } from "../helpers/types";

type Collections = "animals" | "notifications" | "donations";
type PossibleDataType =
  | Omit<IAnimal, "id" | "imageUrl">
  | Omit<INotification, "id">
  | Omit<IDonation, "id">;
class FiresStore {
  collections: { [key in Collections]: CollectionReference<DocumentData> } = {
    animals: collection(db, "animals"),
    notifications: collection(db, "notifications"),
    donations: collection(db, "donations"),
  };
  storage = getStorage();

  async GetCollectionByName<T>(
    collectionName: Collections,
    setterFunction: React.Dispatch<React.SetStateAction<T[] | undefined>>
  ) {
    const q = query(this.collections[collectionName]);

    let tempData: T[] = [];

    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id } as T;
        tempData.push(data);
      });
      setterFunction(tempData);
      tempData = [];
    });
    return unsub;
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

      uploadTask.on(
        "state_changed",
        () => void 0,
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
    id: string,
    data: Partial<PossibleDataType>,
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

      uploadTask.on(
        "state_changed",
        () => void 0,
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

  async DeleteDocumentById(collectionName: Collections, id: string) {
    const documentRef = doc(db, collectionName, id);
    await deleteDoc(documentRef);
  }
}

const firestoreUtils = new FiresStore();

export { firestoreUtils };
