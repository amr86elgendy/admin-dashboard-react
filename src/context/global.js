import { createContext, useContext, useReducer } from 'react';

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, openSidebar: !state.openSidebar };
    case 'TOGGLE_SIDEBAR_FULL':
      return { ...state, openSidebarFull: !state.openSidebarFull };
    default:
      return state;
  }
};

// initial state
const initialState = {
  openSidebar: false,
  openSidebarFull: false
};

// create context
const GlobalContext = createContext({});

// context provider
export const GlobalProvider = ({ children }) => {
  const [state, defaultDispatch] = useReducer(reducer, initialState);

  // format dispatch object
  const dispatch = (type, payload) => defaultDispatch({ type, payload });

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
