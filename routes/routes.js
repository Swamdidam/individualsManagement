'use strict';

/*********************************************************
 Authors:               Swam Didam Bobby 
 Year:                  2018
 File Discription:      Routing processes
/********************************************************/

/**
 * Dependencies
*/

const
    express  = require( 'express' ),
    log      = require( '../utils/logger').getLogger( 'routes' ) ,
    _        = require( 'lodash' ) ,
    bcrypt   = require( 'bcryptjs' ) ,
    crypto   = require( 'crypto' ) ,
    mongoose = require( 'mongoose' ) ,
    request  = require( 'request' ) ,
    User     = require( '../models/User' ) ,
    multer   = require( 'multer' );

//***************************************************
// Configuring image for upload as profile photo   
//***************************************************

const storage  = multer.diskStorage( {
    destination: function( req, file, cb ) {
        cb( null, './uploads/')
    },
    filename: function( req, file, cb ){
        cb( null, new Date().toISOString() + file.originalname ) ;
    }   
} ) ;

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || 'image/png'){
        cb( null, true );
    }
    else {
        cb( null, false)
    }
}

const upload = multer( { 
    storage: storage, 
    limits:{
    fileSize: 1024 * 1024 * 2 
    },
    fileFilter: fileFilter 
} );



/**
 * Router instance
*/

const router = express.Router();



//============================================================================================
// User signup, login, find ...
//============================================================================================


router.post("/CreateUser", upload.single( 'profilePhoto' ), function (req, res) {

    //form
    var form = {
        name: req.body.name,
        phone:req.body.phone,
        DOB:req.body.DOB,
        title: req.body.title,
        res_address:req.body.res_address,
        LGA:req.body.LGA,
        state:req.body.state,
        nationality: req.body.nationality,
        gender:req. body.gender,
        emp_status:req.body.emp_status,
        occupation:req.body.occupation,
        work_place:req.body.work_place,
        profilePhoto:req.file.path,
        // TIN:"PL" + req.body.LGA + generated_random_numbers 
    }

    return User.create( form )
        .then(doc => {
            return res.status( 200 ).json( { message: "User created",doc:doc } ) ;
        })
        .catch(err=>{
            return res.status( 500 ).json( { message: "Could not create user", err: err } ) ;
        })

  
});

//=============================================================================================
// User Update router
//=============================================================================================


router.put( '/updateUser/:TIN', ( req, res ) => {
    return User.update ( { TIN : req.params.TIN },
        { $set: req.body } )
        .then ( ok => {
            return res.status ( 200 ).json( { message: "user's detail update" } ) ;
        })
        .catch(err => {
            return res.status( 500 ).json( { message: "Unfurtunately an error has occured" } ) ;

        });
});


//=============================================================================================
// Delete user router
//=============================================================================================


router.delete('/deleteUser/:TIN', (req, res) => {
    return User.findOneAndRemove( { TIN: req.params.name } )
        .then(ok => {
            return res.status( 200 ).json( { message: "user' deleted" } );
        })
        .catch(err => {
            return res.status( 500 ).json( { message: "Unfortunately an error has occured" } ) ;

        });
});


//=============================================================================================
// Searching for a particular users
//=============================================================================================

router.get( "/oneUser/:TIN", function (req, res) {
    return User.find( { TIN: req.params.TIN } )
        .then( doc => {
            return res.status( 200 ).json( { message: "User created",doc:doc } );
        })
        .catch( err => {
            return res.status( 500 ).json( { message: "Cannot find user", err: err } );
        })
      
  });

//=============================================================================================
// Search all registered users
//=============================================================================================

router.get( "/viewAllUsers", function (req, res) {
    return User.find( {} )
        .then( doc => {
            return res.status( 200 ).json( { message: "User created", doc:doc } ) ;
        } )
        .catch(err => {
            return res.status( 500 ).json( { message: "Cannot display list", err: err } ) ;
        } )
      
  } ) ;

  
//=============================================================================
/**
* Module export
*/
//=============================================================================
module.exports = router;