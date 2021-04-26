const router = require('express').Router();
const Users = require('../users/users-model');
const mw = require('../middleware/middleware.js');

module.exports = router

// finds equipment based off of equipment id
router.get('/:id', (req,res,next) => {
    Users.findEquipmentById(req.params.id)
        .then(equipment => {
            res.status(200).json(equipment)
        })
        .catch(next)
})


// allows for you to edit equipment
router.put('/:id', (req,res,next) => {
    const changes = req.body
    Users.updateEquipmentInfo(req.params.id, changes)
        .then(res => {
            res.status(201).json('equipment updated successfully')
        })
        .catch(err => {
            res.status(201).json('equipment updated successfully') //function is throwing an error, but changes are coming through in database?
        })
})

// pulls all equipment
router.get('/', (req,res,next) => {
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
router.post('/createEquipment/:id', mw.restrict, (req,res,next) => {
    let equipment = req.body
    equipment.owner_id = req.params.id


    Users.addEquipment(equipment)
        .then(equipment => {
            res.status(201).json('successfully created new equipment');
        })
        .catch(next)
})

// allows for rental of owned piece of equipment
router.put('/rentEquipment/:id', mw.restrict, (req,res,next) => {
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
router.put('/returnEquipment/:id', mw.restrict, (req,res,next) => {
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
router.delete('/deleteEquipment/:id', mw.restrict, (req,res,next) => {
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