import { createContext, useContext, useReducer } from 'react';

const TOGGLE_EDIT = 'TOGGLE_EDIT';
const RESET_EDIT = 'RESET_EDIT';

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

const initialState = { editMode: false };

const EditModeContext = createContext();

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

export const useEditMode = () => useContext(EditModeContext);
