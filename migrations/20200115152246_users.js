
exports.up = function(knex) {
    return knex.schema.createTable('users',(table)=>{
        table.increments("user_id",2).primary();
        table.string("first_name",80).notNullable();
        table.string("last_name",80).notNullable();
        table.string("email",20).notNullable();
        table.string("user_name",30).notNullable();
        table.string("password",20).notNullable();
        table.string("profile_name",60);
        table.string("address",60).notNullable();
        table.string("city",60).notNullable();
        table.string("state",60).notNullable();
        table.integer("zip_code",10).notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
