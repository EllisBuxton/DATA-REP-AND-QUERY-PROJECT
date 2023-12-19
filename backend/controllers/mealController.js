const Meals = require('../models/mealsModel');
const mongoose = require('mongoose');

// Get all meals
const getMeals = async (req, res) => {
    try {
        const meals = await Meals.find({}).sort({ createdAt: -1 });
        res.status(200).json(meals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single meal
const getMeal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `No meal with id: ${id}` });
    }

    try {
        const meal = await Meals.findById(id);

        if (!meal) {
            return res.status(404).json({ error: `No meal with id: ${id}` });
        }

        res.status(200).json(meal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Post new meal
const createMeal = async (req, res) => {
    const { title, weight, calories } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!weight) {
        emptyFields.push('weight');
    }
    if (!calories) {
        emptyFields.push('calories');
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all fields', emptyFields});
    }

    try {
        const meal = await Meals.create({ title, weight, calories });
        res.status(201).json(meal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete meal
const deleteMeal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `No meal with id: ${id}` });
    }

    try {
        const meal = await Meals.findOneAndDelete({ _id: id });

        if (!meal) {
            return res.status(404).json({ error: `No meal with id: ${id}` });
        }

        res.status(200).json(meal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update meal
const updateMeal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `No meal with id: ${id}` });
    }

    try {
        const meal = await Meals.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

        if (!meal) {
            return res.status(404).json({ error: `No meal with id: ${id}` });
        }

        res.status(200).json({ meal: 'Meal updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getMeals,
    getMeal,
    createMeal,
    deleteMeal,
    updateMeal
};
