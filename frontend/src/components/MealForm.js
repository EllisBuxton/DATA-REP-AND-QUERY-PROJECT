import { useState } from 'react'
import { useMealsContext } from '../hooks/useMealsContext'

const MealForm = () => {
    const { dispatch } = useMealsContext()

    const [title, setTitle] = useState('')
    const [weight, setWeight] = useState('')
    const [calories, setCalories] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

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
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setWeight('')
            setCalories('')
            setError(null)
            setEmptyFields([])
            console.log('New Meal Added')
            dispatch({ type: 'CREATE_MEAL', payload: json })
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
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default MealForm