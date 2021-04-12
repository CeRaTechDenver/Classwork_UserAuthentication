"use strict";

const mongoose = require('mongoose'),
{ Schema } = require("mongoose"),
courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        maxStudents: {
            type: Number,
            default: 0,
            min: [0, "Course cannot have negative number of students"]//min vaule then error message
        },
        cost: {
            type: Number,
            default: 0,
            min: [0, "Costs could not be negative values"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Course", courseSchema); //name and schema name
