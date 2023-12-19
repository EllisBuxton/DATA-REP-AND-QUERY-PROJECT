import { useMealsContext } from '../hooks/useMealsContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const MealDetails = ({ meal }) => {
    const { dispatch } = useMealsContext()

    const handleClick = async () => {
        const response = await fetch('/api/meals/' + meal._id, {
            method: 'DELETE'
        } )
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_MEAL', payload: json })
        }
    }

    return (
        <div className="meal-details">
            <h4>{meal.title}</h4>
            <p><strong>Weight (grams): </strong>{meal.weight}</p>
            <p><strong>Calories: </strong>{meal.calories}</p>
            <p>{formatDistanceToNow(new Date(meal.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            </div>
    )
}

export default MealDetails