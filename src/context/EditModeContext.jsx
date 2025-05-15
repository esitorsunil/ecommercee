import React, { createContext, useContext, useReducer } from 'react';

// Actions
const TOGGLE_EDIT = 'TOGGLE_EDIT';
const RESET_EDIT = 'RESET_EDIT';

// Reducer
const editModeReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_EDIT:
      return { editMode: !state.editMode };
    case RESET_EDIT:
      return { editMode: false };
    default:
      return state;
  }
};

// Initial State
const initialState = { editMode: false };

// Context
const EditModeContext = createContext();

// Provider
export const EditModeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(editModeReducer, initialState);

  const toggleEditMode = () => dispatch({ type: TOGGLE_EDIT });
  const resetEditMode = () => dispatch({ type: RESET_EDIT });

  return (
    <EditModeContext.Provider value={{ editMode: state.editMode, toggleEditMode, resetEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
};

// Custom Hook
export const useEditMode = () => useContext(EditModeContext);
