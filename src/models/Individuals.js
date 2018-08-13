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
        required: [true, "Please enter a valid email address"],
    },
    phone: {
        type: String,
        required: [true, "Please add a password 11 digit minimum"],
    },
    DOB: {
        type: String,
        required: [true, "please fill in your age"]
    },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Ms", "Mallam"]
    },
    res_address: {
        type: String,
        required: [true, "residential address is required"]
    },
    LGA: {
        type: String,
        // ToDo  enum: ["Abia","Plateau"],
        required: [true, "Please select State"]
    },
    state: {
        type: String,
        // ToDo  enum: ["Abia","Plateau"],
        required: [true, "Please select State"]
    },
    nationality: {
        type: String,
        required: [true, "Nationality required"]
    },
    gender: {
        type: String,
        required: [true, "Select Gender"],
        // enum: ["Male", "Female", "Others"]
    },
    emp_status: {
        type: String,
        required: [true, "Please select Employment status"],
        // enum: ["Self-employed", "Employed"]
    },
    work_place: {
        type: String,
        required: [true, "please select work place name"],
        //enum: [ToDO]
    },
    occupation: {
        type: String,
        required: [true, "Please add occupation"]
    },
    profilePhoto: {
        type: String,
        required: [true, "Please add profile photo"]
    }
    
 
});

module.exports = mongoose.model('Individuals', IndividualsSchema);


