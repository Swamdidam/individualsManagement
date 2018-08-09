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
    Individuals     = require( '../models/Individuals' ) ,
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
// Individuals signup, login, find ...
//============================================================================================


router.post("/CreateIndividuals", upload.single( 'profilePhoto' ), function (req, res) {

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

    return Individuals.create( form )
        .then(doc => {
            return res.status( 200 ).json( { message: "Individuals created",doc:doc } ) ;
        })
        .catch(err=>{
            return res.status( 500 ).json( { message: "Could not create Individuals", err: err } ) ;
        })

  
});

//=============================================================================================
// Individuals Update router
//=============================================================================================


router.put( '/updateIndividuals/:TIN', ( req, res ) => {
    return Individuals.update ( { TIN : req.params.TIN },
        { $set: req.body } )
        .then ( ok => {
            return res.status ( 200 ).json( { message: "Individuals's detail update" } ) ;
        })
        .catch(err => {
            return res.status( 500 ).json( { message: "Unfurtunately an error has occured" } ) ;

        });
});


//=============================================================================================
// Delete Individuals router
//=============================================================================================


router.delete('/deleteIndividuals/:TIN', (req, res) => {
    return Individuals.findOneAndRemove( { TIN: req.params.name } )
        .then(ok => {
            return res.status( 200 ).json( { message: "Individuals' deleted" } );
        })
        .catch(err => {
            return res.status( 500 ).json( { message: "Unfortunately an error has occured" } ) ;

        });
});


//=============================================================================================
// Searching for a particular Individualss
//=============================================================================================

router.get( "/oneIndividuals/:TIN", function (req, res) {
    return Individuals.find( { TIN: req.params.TIN } )
        .then( doc => {
            return res.status( 200 ).json( { message: "Individuals created",doc:doc } );
        })
        .catch( err => {
            return res.status( 500 ).json( { message: "Cannot find Individuals", err: err } );
        })
      
  });

//=============================================================================================
// Search all registered Individualss
//=============================================================================================

router.get( "/viewAllIndividualss", function (req, res) {
    return Individuals.find( {} )
        .then( doc => {
            return res.status( 200 ).json( { message: "Individuals created", doc:doc } ) ;
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
