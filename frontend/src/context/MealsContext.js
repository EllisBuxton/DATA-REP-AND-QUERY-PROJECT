import { createContext, useReducer } from 'react';//imports createContext and useReducer from react

//creates context for managing meals
export const MealsContext = createContext();

//reducer that manages the meal states
export const mealsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEALS':
      return { 
        meals: action.payload 
      };
    case 'CREATE_MEAL':
      return { 
        meals: [action.payload, ...state.meals] 
      };
    case 'DELETE_MEAL':
      return {
        meals: state.meals.filter((w) => w._id !== action.payload._id)
      };
    case 'PATCH_MEAL':
      return {
        meals: state.meals.map((w) => (w._id === action.payload._id ? action.payload : w)),
      };
    default:
      return state;
  }
};

//contexr provider for managing meal states
export const MealsContextProvider = ({ children }) => {
  //using useReducer to manage the state and dispatch actions
  const [state, dispatch] = useReducer(mealsReducer, { 
    meals: null
  });

  //sends states and dispatch to context
  return (
    <MealsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MealsContext.Provider>
  );
};
