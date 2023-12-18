const MealDetails = ({ meal }) => {
    return (
        <div className="meal-details">
            <h4>{meal.title}</h4>
            <p><strong>Weight (grams): </strong>{meal.weight}</p>
            <p><strong>Calories: </strong>{meal.calories}</p>
            <p>{meal.createdAt}</p>
            </div>
    )
}

export default MealDetails