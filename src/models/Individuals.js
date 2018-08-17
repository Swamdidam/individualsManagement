'use strict';

/*********************************************************
 Created  by Swam Didam Bobby on 09/08/2018
 Modified by Swam Didam Bobby on 13/08/2018
/********************************************************/

// model dependencies

const
    mongoose                = require("mongoose"),
    bcrypt                  = require("bcryptjs");


// MONGOOSE MODEL CONFIGURATION
const IndividualsSchema = new mongoose.Schema({

    
    name: {
        type: String,
        // required: [true, "Name is required"],
    },
    phone: {
        type: String,
        // required: [true, "Phone number is required"],
    },
    DOB: {
        type: String,
        // required: [true, "DOB is required"]
    },
    title: {
        type: String,
    },
    resAddress: {
        type: String,
        // required: [true, "residential address is required"]
    },
    LGA: {
        type: String,
        // required: [true, "Please select LGA"]
    },
    state: {
        type: String,
        // required: [true, "Please select State"]
    },
    nationality: {
        type: String,
        // required: [true, "Nationality required"]
    },
    gender: {
        type: String,
        // required: [true, "Select Gender"],
        enum: ["Male", "Female", "Others"]
    },
    empStatus: {
        type: String,
        // required: [true, "Please select Employment status"],
    },
    workPlace: {
        type: String,
        // required: [true, "please select work place name"],
    },
    occupation: {
        type: String,
        // required: [true, "Please add occupation"]
    },
    // profilePhoto: {
    //     type: String,
    //     // required: [true, "Please add profile photo"]
    // },
    TIN:{
        type: String
    }
    
 
});

module.exports = mongoose.model('Individuals', IndividualsSchema);


