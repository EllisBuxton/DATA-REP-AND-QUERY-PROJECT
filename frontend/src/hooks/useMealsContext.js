import { MealsContext } from "../context/MealsContext";// import MealContext 
import { useContext } from "react";//import useContext from react

//hook for accesing MealsContext
export const useMealsContext = () => {
  //useContext used to get current context value
  const context = useContext(MealsContext);

  //checks if hook is used in MealsContextProvider
  if (!context) {
    throw Error('useMealsContext must be used inside a MealsContextProvider');
  }

  //returns context value
  return context;
};
