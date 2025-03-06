import React, {createContext, useState} from "react";
export const HomeContext = createContext();
export const HomeProvider = ({children}) => {
  const [house, sethouse] = useState([]);
  const[selected, setSelected] = useState([]);
  return <HomeContext.Provider value={{house, sethouse, selected, setSelected}}>{children}</HomeContext.Provider>;
};
