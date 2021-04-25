const db = require('../../data/dbConfig.js');

module.exports = {
    findById,
    findByUsername,
    add,
    findOwnerEquipment,
    findRenterEquipment,
    findEquipment
};

// finds user in database by user_id and pulls all columns from users table
function findById(user_id) {
    return db('users')
        .select('user_id', 'username', 'password', 'user_type')
        .where('users.id', id)
        .first()
}

// finds user in database by username and pulls all columns from users table
function findByUsername(username) {
    return db('users')
        .select('user_id', 'username', 'password', 'user_type')
        .where('users.username', username)
        .first()
}

// creates user in database and returns that newly created user
async function add(user) {
    const [id] = await db('users').insert(user)
    return findById(id)
}

// finds owner in database and pulls all owner equipment
function findOwnerEquipment(owner_id) {
    return db('equipment')
        .select('equipment_name', 'equipment_description', 'renter_id')
        .where('owner_id', owner_id)
}


// finds renter in database and pulls all rented equipment
function findRenterEquipment(renter_id) {
    return db('equipment')
        .select('equipment_name', 'equipment_description', 'owner_id')
        .where('renter_id', renter_id)
}


// finds equipment in database of a particular name
function findEquipment(equipment_name) {
    return db('equipment')
    .select('equipment_name', 'equipment_description', 'owner_id', 'renter_id')
    .where('equipment_name', equipment_name)
}