import React, { createContext, useReducer } from "react";
import Reducer from "./reducers/Reducer";

const initialState = {
  refresh: 0,
  user: {},
  token: "",
  notes: [],
  myNotes: [],
  sharedNotes: [],
  showingSharedNotes: false,
  filteredNotes: [],
  selectedNote: {},
  showEditForm: false,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);

export default Store;