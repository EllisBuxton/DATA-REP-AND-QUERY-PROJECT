import React from 'react';
import { useMealsContext } from '../hooks/useMealsContext';

const CalcBar = () => {
  const { meals } = useMealsContext();

  // Use nullish coalescing operator to handle null or undefined
  const mealsArray = meals ?? [];

  // Calculate total weight and total calories
  const totalWeight = mealsArray.reduce((acc, meal) => acc + meal.weight, 0);
  const totalCalories = mealsArray.reduce((acc, meal) => acc + meal.calories, 0);

  return (
    <div className="calc-bar">
      <h2>Calculation Summary</h2>
      <p>Total Weight: {totalWeight} grams</p>
      <p>Total Calories: {totalCalories}</p>
    </div>
  );
};

export default CalcBar;