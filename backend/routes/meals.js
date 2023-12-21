const express = require('express');//importing express

//importing controller methods from mealController.js
const {
    createMeal,
    getMeal,
    getMeals,
    deleteMeal,
    updateMeal
} = require('../controllers/mealController');

//express instance creation
const router = express.Router();

//route for getting all meals
router.get('/', getMeals);

//route for getting meal by id
router.get('/:id', getMeal);

//route for creating new meal
router.post('/', createMeal);

//route to delete meal by id
router.delete('/:id', deleteMeal);

//route to update meal by id
router.patch('/:id', updateMeal);

// exporting router
module.exports = router;
