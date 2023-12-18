import { set } from 'mongoose'
import { useState } from 'react'

const MealForm = () => {
    const [title, setTitle] = useState('')
    const [weight, setWeight] = useState('')
    const [calories, setCalories] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const meal = { title, weight, calories }

        const response = await fetch('/api/meals', {
            method: 'POST',
            body: JSON.stringify(meal),
            headers: { 'Content-Type': 'application/json' }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setWeight('')
            setCalories('')
            setError('null')
            console.log('New Meal Added')
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a new Meal</h3>

            <label>Meal Name: </label>
            <input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Weight (grams): </label>
            <input
                type='number'
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
            />

            <label>Calories: </label>
            <input
                type='number'
                onChange={(e) => setCalories(e.target.value)}
                value={calories}
            />

            <button>Add Meal</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default MealForm