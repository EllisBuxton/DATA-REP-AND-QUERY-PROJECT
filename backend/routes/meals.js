const express = require('express')

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
router.post('/', (req, res) => {
    res.json({msg: 'POST NEW MEAL'})
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