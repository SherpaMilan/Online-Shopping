import { toast } from "react-toastify";
import { setUser } from "./userSlice";
import { signInWithEmailAndPassword } from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";

//add new user in the database

export const addNewAdminUserAction = async ({ uid, ...rest }) => {
  try {
    await setDoc(doc(db, "users", uid), rest);
  } catch (error) {
    toast.error(error.message);
  }
};

export const getUserAction = (uid) => async (dispatch) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const user = userSnap.data();

      dispatch(setUser({ ...user, uid }));
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const signInUserAction =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const pendingLoging = signInWithEmailAndPassword(auth, email, password);
      toast.promise(pendingLoging, {
        pending: "Please wait...",
      });

      const { user } = await pendingLoging;

      user.uid && dispatch(getUserAction(user.uid));
    } catch (error) {
      toast.error(error.message);
    }
  };
