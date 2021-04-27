
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('equipment').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('equipment').insert([
        {equipment_name: 'camera1', equipment_description: 'this is a test description for equipment 1', owner_id: 2, renter_id: 1},
        {equipment_name: 'VCR2', equipment_description: 'this is a test description for equipment 2', owner_id: 2, renter_id: 1},
        {equipment_name: 'PC3', equipment_description: 'this is a test description for equipment 3', owner_id: 2, renter_id: null},
        {equipment_name: 'camera4', equipment_description: 'this is a test description for equipment 4', owner_id: 3, renter_id: null},
        {equipment_name: 'VCR5', equipment_description: 'this is a test description for equipment 5', owner_id: 3, renter_id: null}
      ]);
    });
};
