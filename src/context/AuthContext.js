import { createContext } from "react";

//export const {Provider} = createContext()
export const AuthContext = createContext();

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

const AuthContextProvider = ({ children }) => {
  const values = { currentUser: { displayName: "Vega Xagev" } };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
