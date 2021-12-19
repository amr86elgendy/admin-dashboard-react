import { createContext, useContext, useReducer } from 'react';

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_ADMIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        // token: action.payload.token,
      };
    case 'LOGOUT_ADMIN':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        // token: null,
      };
    default:
      return state;
  }
};

// initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  // token: null,
};

// create context
const AuthContext = createContext({});

// context provider
export const AuthProvider = ({ children }) => {
  const [state, defaultDispatch] = useReducer(reducer, initialState);

  // format dispatch object
  const dispatch = (type, payload) => defaultDispatch({ type, payload });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
