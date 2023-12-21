//imports hook to access Mealscontext
import { useMealsContext } from '../hooks/useMealsContext';

//function for calculation in the summary bar
const CalcBar = () => {
  //uses useMealCotext to get meal data
  const { meals } = useMealsContext();

  //nullish coalescing to handle null or undefined
  const mealsArray = meals ?? [];

  //calculates total weight and calories using array reduce 
  const totalWeight = mealsArray.reduce((acc, meal) => acc + meal.weight, 0);
  const totalCalories = mealsArray.reduce((acc, meal) => acc + meal.calories, 0);

  //renders the calc summary bar
  return (
    <div className="calc-bar">
      <h2>Calculation Summary</h2>
      <p>Total Weight: {totalWeight} grams</p>
      <p>Total Calories: {totalCalories}</p>
    </div>
  );
};

//export calcBar component
export default CalcBar;
