"use strict";

const mongoose = require("mongoose"),
    subscriberSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        zipCode: {
            type: Number,
            min: [10000, "Zip code is too short"],
            max: 99999
        },
        courses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}]
    },
    {
        timestamps: true
    });

subscriberSchema.methods.getInfo = function (){
    return  `Name: ${this.name} Email: ${this.email} Zipcode: ${this.zipCode}`;
}

//make a model and tie it to the schema above
module.exports = mongoose.model("Subscriber", subscriberSchema);
