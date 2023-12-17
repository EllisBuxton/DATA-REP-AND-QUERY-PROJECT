const express = require('express')
const Meals = require('../models/mealsModel')

const router = express.Router()

//get all meals
router.get('/', (req, res) => {
    res.json({msg: 'GET ALL WORKOUTS'})
})

//get single meals
router.get('/:id', (req, res) => {
    res.json({msg: 'GET SINGLE WORKOUT'})
})

//post new meals
router.post('/', async (req, res) => {
    const {title, weight, calories} = req.body

    try{
        const meal = await Meals.create({title, weight, calories})
        res.status(200).json(meal)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
})

//delete meal
router.delete('/:id', (req, res) => {
    res.json({msg: 'DELETE NEW MEAL'})
})

//update a  meal
router.patch('/:id', (req, res) => {
    res.json({msg: 'UPDATE A MEAL'})
})

module.exports = router