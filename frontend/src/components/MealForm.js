
import { useState } from 'react';//import useState from react
import { useMealsContext } from '../hooks/useMealsContext';//import hook for using MealContext

//function that renders form for adding new meal
const MealForm = () => {
    //uses useMealContext to get dispatch function
    const { dispatch } = useMealsContext();

    //state variable for form inputs, error and emptyfields
    const [title, setTitle] = useState('');
    const [weight, setWeight] = useState('');
    const [calories, setCalories] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    //funciton for handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        //creates meal onject with the form input values
        const meal = { title, weight, calories };

        //sends post req to add the new meal
        const response = await fetch('/api/meals', {
            method: 'POST',
            body: JSON.stringify(meal),
            headers: { 'Content-Type': 'application/json' },
        });

        //parses the response json
        const json = await response.json();

        //checks for error is response
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }

        // when req is succesful, reset the input fields updates the state
        if (response.ok) {
            setTitle('');
            setWeight('');
            setCalories('');
            setError(null);
            setEmptyFields([]);
            console.log('New Meal Added');
            dispatch({ type: 'CREATE_MEAL', payload: json });
        }
    };

    //render the form for adding meal
    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a new Meal</h3>

            <label>Meal Name: </label>
            <input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Weight (grams): </label>
            <input
                type='number'
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
                className={emptyFields.includes('weight') ? 'error' : ''}
            />

            <label>Calories: </label>
            <input
                type='number'
                onChange={(e) => setCalories(e.target.value)}
                value={calories}
                className={emptyFields.includes('calories') ? 'error' : ''}
            />

            <button>Add Meal</button>

            {/* display error message if there is an error */}
            {error && <div className='error'>{error}</div>}
        </form>
    );
};

//Exports MealForm
export default MealForm;
