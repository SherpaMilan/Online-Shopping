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
import { setPayment } from "./paymentSlice";

export const addPaymentOptions =
  ({ id, ...form }) =>
  async (dispatch) => {
    try {
      // const respPending = addDoc(collection(db, "category"), obj);

      console.log("ii", form);
      const respPending = setDoc(doc(db, "payment", id), form);

      toast.promise(respPending, {
        pending: "Please wait...",
      });

      const docRef = await respPending;

      toast.success("New category has been added successfully");

      // fetch all category and mount to our redux

      dispatch(fetchPaymentOptions());
    } catch (error) {
      console.log(error);
    }
  };

export const fetchPaymentOptions = () => async (dispatch) => {
  try {
    //get all categories from firstore and mount in the redux
    const q = query(collection(db, "payment"));

    const catSnapshot = await getDocs(q);

    let data = [];

    catSnapshot.forEach((doc) => {
      const cat = { ...doc.data(), paymentid: doc.id };
      data.push(cat);
    });

    // console.log("ppoooo", data);
    dispatch(setPayment(data));
  } catch (error) {
    console.log(error);
  }
};
