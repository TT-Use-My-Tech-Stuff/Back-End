const db = require('../../data/dbConfig.js');

module.exports = {
    findById,
    findByUsername,
    add,
    findOwnerEquipment,
    findRenterEquipment,
    findEquipment,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    findEquipmentById,
    updateEquipmentInfo
};

// finds user in database by user_id and pulls all columns from users table
function findById(user_id) {
    return db('users')
        .select('user_id', 'username', 'password', 'user_type')
        .where('user_id', user_id)
        .first()
}

// finds user in database by username and pulls all columns from users table
function findByUsername(username) {
    return db('users')
        .select('user_id', 'username', 'password', 'user_type')
        .where('username', username)
        .first()
}

// creates user in database and returns that newly created user
async function add(user) {
    const [id] = await db('users').insert(user)
    return findById(id)
}

// creates equipment in database
function addEquipment(equipment) {
    return db('equipment').insert(equipment)
}

// finds owner in database and pulls all owner equipment
function findOwnerEquipment(owner_id) {
    return db('equipment')
        .select('equipment_id', 'equipment_name', 'equipment_description', 'renter_id', 'owner_id')
        .where('owner_id', owner_id)
}


// finds renter in database and pulls all rented equipment
function findRenterEquipment(renter_id) {
    return db('equipment')
        .select('equipment_id', 'equipment_name', 'equipment_description', 'owner_id', 'renter_id')
        .where('renter_id', renter_id)
}


// finds equipment in database of a particular name
function findEquipment() {
    return db('equipment')
        .select('equipment_id', 'equipment_name', 'equipment_description', 'owner_id', 'renter_id')
}

// finds one equipment in database based off of equipment_id
function findEquipmentById(equipment_id) {
    return db('equipment')
        .select('equipment_id', 'equipment_name', 'equipment_description', 'owner_id', 'renter_id')
        .where('equipment_id', equipment_id)
        .first()
}


// updates equipment for renter
function updateEquipment(equipment_id, renter_id) {
    return db('equipment')
        .where('equipment_id', equipment_id)
        .update('renter_id', renter_id)
}


// updates equipment
function updateEquipmentInfo(equipment_id, changes) {
    return db('equipment')
        .where('equipment_id', equipment_id)
        .update(changes, '*')
}



// deletes equipment
function deleteEquipment(equipment_id) {
    return db('equipment')
        .where('equipment_id', equipment_id)
        .del()
}