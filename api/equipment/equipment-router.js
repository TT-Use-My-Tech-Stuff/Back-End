const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../config/secret.js');
const Users = require('../users/users-model');
const mw = require('../middleware/middleware.js');

module.exports = router


// pulls all equipment
router.get('/equipment', (req,res,next) => {
    Users.findEquipment()
        .then(equipment => {
            res.status(200).json(equipment)
        })
        .catch(next)
})


// pulls all rented equipment
router.get('/renter/:id', mw.restrict, (req,res,next) => {
    Users.findRenterEquipment(req.params.id)
        .then(equipment => {
            res.status(200).json(equipment)
        })
        .catch(next)
})


// pulls all owned equipment
router.get('/owner/:id', mw.restrict, (req,res,next) => {
    Users.findOwnerEquipment(req.params.id)
        .then(equipment => {
            res.status(200).json(equipment)
        })
        .catch(next)
})


// edits an owned piece of equipment
router.put('/edit', (req,res,next) => {

})