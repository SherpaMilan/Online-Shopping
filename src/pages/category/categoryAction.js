import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { toast } from "react-toastify";
import { setCats } from "./categorySilce";
import { setShowModal } from "../../system/systemSlice";

export const fethCagegoriesAction = () => async (dispatch) => {
  try {
    //get all categories from firstore and mount in the redux
    const q = query(collection(db, "category"));

    const catSnapshot = await getDocs(q);

    let cats = [];

    catSnapshot.forEach((doc) => {
      const cat = { ...doc.data(), slug: doc.id };
      cats.push(cat);
    });

    console.log(cats);
    dispatch(setCats(cats));
  } catch (error) {
    console.log(error);
  }
};

export const addNewCategoryAction =
  ({ slug, ...rest }) =>
  async (dispatch) => {
    try {
      // const respPending = addDoc(collection(db, "category"), obj);
      const respPending = setDoc(doc(db, "category", slug), rest);
      toast.promise(respPending, {
        pending: "Please wait...",
      });

      const docRef = await respPending;

      toast.success("New category has been added successfully");

      // fetch all category and mount to our redux

      dispatch(fethCagegoriesAction());
    } catch (error) {
      console.log(error);
    }
  };

export const deleteCategoryAction = (slug) => async (dispatch) => {
  try {
    const respPromis = deleteDoc(doc(db, "category", slug));
    toast.promise(respPromis, {
      pending: "Please wait",
    });
    await respPromis;
    dispatch(fethCagegoriesAction());
    toast.success("The category has been deleted");
  } catch (error) {
    console.log(error);
    toast.error("Unable to delete the category ");
  }
};

export const updateCategoryAction =
  ({ slug, ...rest }) =>
  async (dispatch) => {
    try {
      // const respPending = addDoc(collection(db, "category"), obj);
      const respPending = setDoc(doc(db, "category", slug), rest, {
        merge: true,
      });
      toast.promise(respPending, {
        pending: "Please wait...",
      });

      await respPending;

      toast.success("New category has been added successfully");

      // fetch all category and mount to our redux

      dispatch(fethCagegoriesAction());
      dispatch(setShowModal(false));
    } catch (error) {
      console.log(error);
    }
  };
