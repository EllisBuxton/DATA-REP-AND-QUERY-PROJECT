const express = require('express');
const {
    createMeal,
    getMeal,
    getMeals,
    deleteMeal,
    updateMeal
} = require('../controllers/mealController');

const router = express.Router();

// Get all meals
router.get('/', getMeals);

// Get single meal
router.get('/:id', getMeal);

// Post new meal
router.post('/', createMeal);

// Delete meal
router.delete('/:id', deleteMeal);

// Update a meal
router.patch('/:id', updateMeal);

module.exports = router;
