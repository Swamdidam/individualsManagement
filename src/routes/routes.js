'use strict';

/*********************************************************
 Created  by Swam Didam Bobby on 09/08/2018
 Modified by Swam Didam Bobby on 13/08/2018
/********************************************************/

/**************************************************************************
        Importing Dependances
 **************************************************************************/

const
    express         = require( 'express' ),
    log             = require( '../utils/logger').getLogger( 'routes' ) ,
    _               = require( 'lodash' ) ,
    bcrypt          = require( 'bcryptjs' ) ,
    crypto          = require( 'crypto' ) ,
    mongoose        = require( 'mongoose' ) ,
    request         = require( 'request' ) ,
    Individuals     = require( '../models/utils/IndividualsUtils' ) ,
    multer          = require( 'multer' );

/**************************************************************************
 Configuring image for upload as profile photo   
***************************************************************************/

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



/***********************************************************************************************
        Router instance
************************************************************************************************/

const router = express.Router();

router.post("/createIndividuals", upload.single( 'profilePhoto' ), function (req, res) {
    return Individuals.createIndividuals( req.body )
        .then(doc => {
            console.log("Registration Successful");
            return res.status(200).json(doc);
        })
        .catch(err=>{
            console.log("Registration Failed");
            return res.status(500).json( err ) ;
        })
});

/***********************************************************************************************
       Updating Individual Tax payers 
************************************************************************************************/

router.put('/updateIndividuals', (req, res) => {
    return Individuals.updateIndividuals(req.body.filter, req.body.update)
        .then(doc => {
            console.log("Details Update Successful");
            return res.status(200).json(doc);
        })
        .catch(err => {
            console.log("Details Update Failed");
            return res.status(500).json(err);
        });
});

/***********************************************************************************************
       Deleting Individual Tax payers 
************************************************************************************************/

router.delete('/deleteIndividuals', (req, res) => {
    return Individuals.deleteIndividuals( req.body )
        .then(ok => {
            console.log("Successfully deleted Account");
            return res.status(200).json(ok);
        })
        .catch(err => {
            console.log("Account Deletion failed");
            return res.status(500).json(err) ;

        });
});


/***********************************************************************************************
        Searching for a particular Individualss
************************************************************************************************/

router.post('/getIndividuals', (req, res) => {

    return Individuals.getIndividuals(req.body)
        .then(doc => {
            console.log("Search successful");
            return res.status(200).json(doc);
        })
        .catch(err => {
            console.log("Search Failed");
            return res.status(500).json(err);
        });
});

/***********************************************************************************************
        Viewing all registered Individualss
************************************************************************************************/

router.get('/getAllIndividuals', (req, res) => {
    return Individuals.getAllIndividuals({})
        .then(doc => {
            console.log("Search Successful");
            return res.status(200).json(doc);
        })
        .catch(err => {
            console.log("Search Failed");
            return res.status(500).json(err);
        });
  });

  
/***********************************************************************************************
       Exporting router
************************************************************************************************/

module.exports = router;
