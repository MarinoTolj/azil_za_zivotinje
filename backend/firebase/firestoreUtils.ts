import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
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
import { IAnimal, IDonation, INotification } from "../../src/helpers/types";

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

  async GetCollectionByName<T>(collectionName: Collections) {
    const q = query(this.collections[collectionName]);

    try {
      const docSnap = await getDocs(q);
      if (!docSnap.empty) {
        const data: any = [];

        docSnap.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        return data;
      } else {
        throw new Error(`No collection by name: ${collectionName}`);
      }
    } catch (error: any) {
      return error.message;
    }
  }

  async GetDocumentById<T>(collectionName: Collections, id: string) {
    const documentRef = doc(db, collectionName, id);

    try {
      const docSnap = await getDoc(documentRef);
      let data = {};
      if (docSnap.exists()) {
        onSnapshot(documentRef, (doc) => {
          data = { ...doc.data(), id: doc.id };
        });
        return data;
      } else {
        throw new Error(`No document by id: ${id}`);
      }
    } catch (error: any) {
      return error.message;
    }
  }

  async AddDocument(
    collectionName: Collections,
    data: PossibleDataType,
    image?: File
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
    image?: File
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
