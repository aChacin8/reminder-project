/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('events').then(function(exists){
    if(!exists){
        return knex.schema.createTable('events', function(table){
            table.increments('id_events').primary()
            table.integer('id_users').unsigned().notNullable()
            table.foreign('id_users')
                .references('id_users').inTable('users')
                .onDelete('CASCADE')
            table.string('event_name').notNullable()
            table.string('event_description')
            table.dateTime('event_start_date').notNullable()
            table.dateTime('event_end_date').notNullable()
            table.string('color').defaultTo('#3788d8')
            table.boolean('notified').defaultTo(false)
            table.boolean('important').defaultTo(false)
            table.boolean('completed').defaultTo(false)
            table.boolean('active').defaultTo(true)
            table.timestamp('created_at').defaultTo(knex.fn.now())
        }) //Crea las columnas de la tabla events
    }
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.hasTable('events').then(function(exists){
    if(exists){
        return knex.schema.dropTable('events')
    }
  }) //Si existe la tabla events, la elimina
};
