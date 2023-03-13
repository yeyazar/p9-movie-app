import { createUserWithEmailAndPassword } from "firebase/auth";
import { createContext } from "react";
import { auth } from "../auth/firebase";

//export const {Provider} = createContext()
export const AuthContext = createContext();

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

const AuthContextProvider = ({ children }) => {
  const values = { currentUser: { displayName: "Vega Xagev" } };

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

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
