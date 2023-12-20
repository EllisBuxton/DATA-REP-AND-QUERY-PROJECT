import { useMealsContext } from '../hooks/useMealsContext'
import { useState } from 'react'; // Import useState
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const MealDetails = ({ meal }) => {
    const { dispatch } = useMealsContext()

    const [isEditPopupVisible, setEditPopupVisible] = useState(false);
    const [editedTitle, setEditedTitle] = useState(meal.title);
    const [editedWeight, setEditedWeight] = useState(meal.weight);
    const [editedCalories, setEditedCalories] = useState(meal.calories);

    const handleClick = async () => {
        const response = await fetch('/api/meals/' + meal._id, {
            method: 'DELETE'
        } )
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_MEAL', payload: json })
        }
    }
    const handleEdit = () => {
        // Show edit popup
        setEditPopupVisible(true);
    };

    const handleSave = async () => {
        // Send PATCH request with updated values
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
            // Hide edit popup after successful save
            setEditPopupVisible(false);

            
        }
    };

    const closeEditPopup = () => {
        // Close edit popup without saving
        setEditPopupVisible(false);
    };

    return (
        <div className="meal-details">
            <h4>{meal.title}</h4>
            <p><strong>Weight (grams): </strong>{meal.weight}</p>
            <p><strong>Calories: </strong>{meal.calories}</p>
            <p>{formatDistanceToNow(new Date(meal.createdAt), {addSuffix: true})}</p>
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

export default MealDetails;