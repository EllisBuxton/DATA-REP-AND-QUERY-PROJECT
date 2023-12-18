import { useEffect, useState } from "react"
//components
import MealDetails from "../components/MealDetails"
import MealForm from "../components/MealForm"

//Homepage component
const Home = () => {
    const [meals, setMeals] = useState(null)

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('/api/meals')
            const json = await response.json()

            if (response.ok) {
                setMeals(json)
            }
        }

        fetchMeals()
    }, [])


    return (
        <div className="home">
            <div className="meals">
                {meals && meals.map((meal) =>(
                    <MealDetails key={meal._id} meal={meal} />
                ))}
                </div> 
                <MealForm />
            </div>
    )
}

export default Home