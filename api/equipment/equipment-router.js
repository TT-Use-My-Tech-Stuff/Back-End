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


// creates a new piece of equipment
router.post('/createEquipment/:id', (req,res,next) => {
    let equipment = req.body
    equipment.owner_id = req.params.id


    Users.addEquipment(equipment)
        .then(equipment => {
            res.status(201).json(equipment);
        })
        .catch(next)
})

// allows for rental of owned piece of equipment
router.put('/rentEquipment/:id', (req,res,next) => {
    let equipment_id = req.body.equipment_id
    let currentRenter_id = req.body.renter_id
    if(currentRenter_id != null){
        res.status(422).json({message: `this equipment is already rented out`})
    }else{
        let newRenter_id = req.params.id
    Users.updateEquipment(equipment_id, newRenter_id)
        .then(count => {
            if(count > 0){
                res.status(201).json({message: `update successful`})
            }else{
                res.status(404).json(message.err)
            }
        })
        .catch(next)
    }
})

//returns equipment
router.put('/returnEquipment/:id', (req,res,next) => {
    let equipment_id = req.params.id
    Users.updateEquipment(equipment_id, null)
        .then(count => {
            if(count > 0){
                res.status(201).json({message: `equipment returned`})
            }else{
                res.status(404).json(message.err)
            }
        })
        .catch(next)
})

// deletes equipment
router.delete('/equipment/:id', (req,res,next) => {
    Users.deleteEquipment(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(201).json({message: `equipment deleted successfully`})
            }else{
                res.status(404).json({message: `the equipment with the specified ID could not be found`})
            }
        })
        .catch(next)
})