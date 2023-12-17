const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mealSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Meals', mealSchema)
