const Meals = require('../models/mealsModel'); //importing meals model
const mongoose = require('mongoose'); //importing mongoose for interaction

//get all meals
const getMeals = async (req, res) => {
    try {
        const meals = await Meals.find({}).sort({ createdAt: -1 }); //gets all meals from the db and sorts by the date created
        res.status(200).json(meals); //responds with the meals in json
    } catch (error) {
        res.status(500).json({ error: error.message }); //handle the errors that occur and responsds with error status
    }
};

//gets a single meal
const getMeal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `No meal with id: ${id}` }); //checks whether id is an acceptable MongoDB id and sends error if not
    }

    try {
        const meal = await Meals.findById(id); // gets a meal by its id from the db

        if (!meal) {
            return res.status(404).json({ error: `No meal with id: ${id}` }); //no meal with specific id sends error
        }

        res.status(200).json(meal); //responds with the meal in json
    } catch (error) {
        res.status(500).json({ error: error.message }); //handles errors and sends error status
    }
};

//creates a new meal
const createMeal = async (req, res) => {
    const { title, weight, calories } = req.body; //gets the title, weight and calories from the request body

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title'); //checks if title missing
    }
    if (!weight) {
        emptyFields.push('weight'); //checks if weight is missing
    }
    if (!calories) {
        emptyFields.push('calories'); //checks if calories is missing
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all fields', emptyFields}); //when a field is empty it will send an error
    }

    try {
        const meal = await Meals.create({ title, weight, calories }); //creates the new meal in the db
        res.status(201).json(meal); //responds with meal in json
    } catch (error) {
        res.status(400).json({ error: error.message }); //handles error
    }
};

//deletes meal
const deleteMeal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `No meal with id: ${id}` }); //checks if id is valid, if not sends error
    }

    try {
        const meal = await Meals.findOneAndDelete({ _id: id }); //delete meal by id in db

        if (!meal) {
            return res.status(404).json({ error: `No meal with id: ${id}` }); //error if no meal found
        }

        res.status(200).json(meal); //responds with deleted meal in json
    } catch (error) {
        res.status(500).json({ error: error.message }); //handles error
    }
};

//updates a meal
const updateMeal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status  (404).json({ error: `No meal with id: ${id}` }); //checks if id is valid mongodb id, if not sends error
    }

    try {
        const meal = await Meals.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true }); //finds a meal by id and updates with new body

        if (!meal) {
            return res.status(404).json({ error: `No meal with id: ${id}` }); //if no meal found sends error
        }

        res.status(200).json(meal); //responds with updated meal in json
    } catch (error) {
        res.status(500).json({ error: error.message }); //handles errors
    }
};

module.exports = {
    getMeals,
    getMeal,
    createMeal,
    deleteMeal,
    updateMeal
};
