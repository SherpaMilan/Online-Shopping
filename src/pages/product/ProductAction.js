import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { toast } from "react-toastify";
import { setProduct, setSelectedCat } from "../product/ProductSlice";

export const fethProductsAction = () => async (dispatch) => {
  try {
    //get all categories from firstore and mount in the redux
    const q = query(collection(db, "products"));

    const prodSnapshot = await getDocs(q);

    let prods = [];

    prodSnapshot.forEach((doc) => {
      const prod = { ...doc.data(), slug: doc.id };
      prods.push(prod);
    });

    dispatch(setProduct(prods));
  } catch (error) {
    console.log(error);
  }
};

export const fethSelectedProductAction = (slug) => async (dispatch) => {
  try {
    //get selected product from firstore and mount in the redux

    const prodSnapshot = await getDoc(doc(db, "products", slug));

    const product = { ...prodSnapshot.data(), slug: prodSnapshot.id };

    dispatch(setSelectedCat(product));
  } catch (error) {
    console.log(error);
  }
};

export const addNewProductAction =
  ({ slug, ...rest }) =>
  async (dispatch) => {
    try {
      await setDoc(doc(db, "products", slug), rest, { merge: true });

      toast.success("New product has been updated");
      dispatch(fethSelectedProductAction(slug));
    } catch (error) {
      console.log(error);
    }
  };

export const updateNewProductAction =
  ({ slug, ...rest }) =>
  async (dispatch) => {
    try {
      await setDoc(doc(db, "products", slug), rest);

      toast.success("New product has been added");
      dispatch(fethProductsAction(slug));
    } catch (error) {
      console.log(error);
    }
  };
