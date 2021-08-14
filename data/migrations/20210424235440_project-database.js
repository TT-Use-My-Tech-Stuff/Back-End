
exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => {
        tbl.increments('user_id')
        tbl.string('username', 128)
            .unique()
            .notNullable()
        tbl.string('password', 128)
            .notNullable()
        tbl.string('user_type')
            .notNullable()
            .default('renter')
    })
    .createTable('equipment', tbl => {
        tbl.increments('equipment_id')
        tbl.string('equipment_name', 128)
            .notNullable()
        tbl.string('equipment_description')
        tbl.integer('owner_id')
            .notNullable()
            .unsigned()
            .references('user_id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        tbl.integer('renter_id')
            .unsigned()
            .references('user_id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('equipment')
    .dropTableIfExists('users')
};
