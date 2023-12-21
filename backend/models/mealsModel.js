const mongoose = require('mongoose')//importing mongoose library

const Schema = mongoose.Schema//creating a mongoose schema

//defining meal schema containing title,weight and calories
const mealSchema = new Schema({
    title: {
        type: String,
        required: true  //title field is required
    },
    weight: {
        type: Number,
        required: true  //weight field is required
    },
    calories: {
        type: Number,
        required: true  //calories field is required
    },
}, { timestamps: true })  //adds timestamps

//exporting meals mongoose model with schema defined
module.exports = mongoose.model('Meals', mealSchema)
