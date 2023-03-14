import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import {
  toastSuccessNotify,
  toastErrorNotify,
} from "../helpers/ToastNotify.jsx";

//export const {Provider} = createContext()
export const AuthContext = createContext();

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userObserver();
  }, []);

  const createUser = async (email, password, displayName) => {
    try {
      //? firebase method to create a new User
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, { displayName: displayName });
      navigate("/");
      toastSuccessNotify("Registered successfully");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toastSuccessNotify("Logged in successfully");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  const userObserver = () => {
    //? A firebase method that follows if the user is signed in or not, and responds on changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
      } else {
        setCurrentUser(false);
        //console.log("logged out");
      }
    });
  };

  const signUpProvider = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/");
        toastSuccessNotify("Logged in Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const values = {
    createUser,
    signIn,
    logOut,
    signUpProvider,
    currentUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
