const express = require('express')
const {
    createMeal,
    getMeal,
    getMeals,
    deleteMeal,
    updateMeal
} = require('../controllers/mealController')

const router = express.Router()

//get all meals
router.get('/', getMeals)

//get single meals
router.get('/:id', getMeal)
//post new meals
router.post('/', createMeal)

//delete meal
router.delete('/:id', deleteMeal)
//update a  meal
router.patch('/:id', updateMeal)

module.exports = router