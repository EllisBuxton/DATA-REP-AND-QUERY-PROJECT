
import { useMealsContext } from '../hooks/useMealsContext';//import hook to acces MealsContext
import { useState } from 'react';//import useState hook from react
import formatDistanceToNow from 'date-fns/formatDistanceToNow';//imports date-fns to make date be the distance to now

//function for displaying the details of the meals
const MealDetails = ({ meal }) => {
    //uses useMealContext to get the dispatch function
    const { dispatch } = useMealsContext();

    // state variables for showing the edit popup annd edited details
    const [isEditPopupVisible, setEditPopupVisible] = useState(false);
    const [editedTitle, setEditedTitle] = useState(meal.title);
    const [editedWeight, setEditedWeight] = useState(meal.weight);
    const [editedCalories, setEditedCalories] = useState(meal.calories);

    //function for clicking the delete button
    const handleClick = async () => {
        const response = await fetch('/api/meals/' + meal._id, {
            method: 'DELETE'
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_MEAL', payload: json });
        }
    };

    //function for clicking the edit button
    const handleEdit = () => {
        //shows edit popup
        setEditPopupVisible(true);
    };

    //function that handles save button being clicked
    const handleSave = async () => {
        //sends the patch request with new details
        const response = await fetch(`/api/meals/${meal._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: editedTitle,
                weight: editedWeight,
                calories: editedCalories,
            }),
        });

        if (response.ok) {
            const json = await response.json();
            const updatedMeal = {
                ...meal,
                title: json.title,
                weight: json.weight,
                calories: json.calories,
            };
            dispatch({ type: 'PATCH_MEAL', payload: updatedMeal });
            //hides the popup after saving
            setEditPopupVisible(false);
        }
    };

    //function that closes edit popup without saving
    const closeEditPopup = () => {
        setEditPopupVisible(false);
    };

    //renders the meal details and the edit and delete button
    return (
        <div className="meal-details">
            <h4>{meal.title}</h4>
            <p><strong>Weight (grams): </strong>{meal.weight}</p>
            <p><strong>Calories: </strong>{meal.calories}</p>
            <p>{formatDistanceToNow(new Date(meal.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined delete-icon" onClick={handleClick}>
                delete
            </span>
            <span className="material-symbols-outlined edit-icon" onClick={handleEdit}>
                edit
            </span>

            {/* Edit popup */}
            {isEditPopupVisible && (
                <div className="edit-popup">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <label>Weight:</label>
                    <input
                        type="text"
                        value={editedWeight}
                        onChange={(e) => setEditedWeight(e.target.value)}
                    />
                    <label>Calories:</label>
                    <input
                        type="text"
                        value={editedCalories}
                        onChange={(e) => setEditedCalories(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={closeEditPopup}>Cancel</button>
                </div>
            )}
        </div>
    );
};

//exports MealDetails
export default MealDetails;
