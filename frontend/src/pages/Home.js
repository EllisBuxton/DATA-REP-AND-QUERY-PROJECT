import { useEffect, useState } from "react"

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
                    <p key={meal._id}>{meal.title}</p>
                ))}
                </div> 
            </div>
    )
}

export default Home