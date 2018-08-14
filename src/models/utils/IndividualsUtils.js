
'use strict';

/*********************************************************
 Created  by Swam Didam Bobby on 13/08/2018
 Modified by Swam Didam Bobby on 13/08/2018
/********************************************************/

const
    Individuals     = require('../Individuals'),
    log             = require('../../utils/logger').getLogger('UsersUtils'),
    _               = require('lodash'),
    mongoose        = require('mongoose'),
    promise         = require('bluebird');

/***************************************************************************
 *   To Create Individual records                                        
 **************************************************************************/

exports.createIndividuals = (doc) => {
    if (_.isEmpty(doc)) {
        return promise.reject("Please fill in all fields");
    }
    if (_.isArray(doc)) {
        return Individuals.insertMany(doc);
    }
    else {
        return Individuals.create(doc);
    }
};

/***************************************************************************
    To find an Individual records                                        
 **************************************************************************/

exports.getIndividuals = (filter) => {
    if (_.isEmpty(filter)) {
        return promise.reject("Missing Fields");
    }
    return Individuals.find(filter)
        .exec()
        .then(result => {
            if (!_.isEmpty(result)) {
                return result;
            }
            else {
                return false;
            }
        });
};

/***************************************************************************
 *   To find All records                                        
 **************************************************************************/

exports.getAllIndividuals = () => {
    return Individuals.find({})
          .then(result => {
              if (!_.isEmpty(result)) {
                  return result;
              }
              else{
                  return false;
              }
          });
    }
   
/***************************************************************************
    To update Individual records                                        
 **************************************************************************/

exports.updateIndividuals = (filter, update) => {
    if (_.isEmpty(filter) || _.isEmpty(update)) {
        return promise.reject("missing fields")
    }
    return Individuals.update(filter, update).exec()
        .then(result => {
            if (result.ok !== 1) {
                return ("update failed")
            }
            else if (result.nModified >= 0) {
                return result;
            }
            else {
                return false
            }
        })
        .catch(err => {
            return ("Server error");
        });
};

/*********************************************
    To Delete Individual records                                        *
 ********************************************/

exports.deleteIndividuals = (filter) => {
    return Individuals.findOneAndRemove(filter)
        .then(ok => {
        return ok   
        })
        .catch(err => {
            return false;
        });
};

