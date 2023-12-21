
import { useEffect } from "react";//import useEffect from react
import { useMealsContext } from "../hooks/useMealsContext";//import hook for acces to MealsContext

//import components
import MealDetails from "../components/MealDetails";
import MealForm from "../components/MealForm";
import CalcBar from "../components/CalcBar";

//function for the home page
const Home = () => {
  //using useMealsContext hook to get meals and dispatch functions
  const { meals, dispatch } = useMealsContext();

  //useEffect to fetch meals when the component mounts
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('/api/meals');
      const json = await response.json();

      //if the request is successful updates the meals in the context
      if (response.ok) {
        dispatch({ type: 'SET_MEALS', payload: json });
      }
    };

    //call the fetchMeals function
    fetchMeals();
  }, [dispatch]); //dependency array to prevent unnecessary refetching

  //renders the home page with the components
  return (
    <div className="home">
      <div className="meals">
        {/* mapping through meals to render MealDetails component for each */}
        {meals && meals.map(meal => (
          <MealDetails meal={meal} key={meal._id} />
        ))}
      </div>
      {/* render MealForm component for adding new meals */}
      <MealForm />
      {/* render CalcBar component for displaying calculation summary */}
      <CalcBar />
    </div>
  );
};

//xport Home
export default Home;
