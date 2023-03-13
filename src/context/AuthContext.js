import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";

//export const {Provider} = createContext()
export const AuthContext = createContext();

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const createUser = async (email, password) => {
    try {
      //? firebase method to create a new User
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  const values = {
    createUser,
    signIn,
    logOut,
    currentUser: { displayName: "Vega Xagev" },
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
