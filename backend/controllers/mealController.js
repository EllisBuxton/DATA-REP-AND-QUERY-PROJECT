const Meals = require('../models/mealsModel')
const mongoose = require('mongoose')

//get all meals 
const getMeals = async (req, res) => {
    const meals = await Meals.find({}).sort({ createdAt: -1 })

    res.status(200).json(meals)
}

//get single meals
const getMeal = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `No meal with id: ${id}` })
    }

    const meal = await Meals.findById(id)

    if (!meal) {
        return res.status(404).json({ error: `No meal with id: ${id}` })
    }

    res.status(200).json(meal)
}

//post new meals
const createMeal = async (req, res) => {
    const { title, weight, calories } = req.body
    //add doc to db
    try {
        const meal = await Meals.create({ title, weight, calories })
        res.status(200).json(meal)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete meal
const deleteMeal = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `No meal with id: ${id}` })
    }

    const meal = await Meals.findOneAndDelete({_id: id})

    if (!meal) {
        return res.status(404).json({ error: `No meal with id: ${id}` })
    }

    res.status(200).json({ meal: 'Meal deleted successfully' })
}

//update a meal
const updateMeal = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `No meal with id: ${id}` })
    }

    const meal = await Meals.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!meal) {
        return res.status(404).json({ error: `No meal with id: ${id}` })
    }

    res.status(200).json({ meal: 'Meal updated successfully' })
}

module.exports = {
    getMeals,
    getMeal,
    createMeal,
    deleteMeal,
    updateMeal
}