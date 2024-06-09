import { createContext, useState, useRef } from "react";

export const AppContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState("");
  const [theme, setTheme] = useState("light");

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      {props.children}
    </AppContext.Provider>
  );
};
export default UserProvider;
