
exports.up = function(knex) {
    return knex.schema.createTable('users',(table)=>{
        table.increments("user_id",2).primary();
        table.string("first_name",80).notNullable();
        table.string("last_name",80).notNullable();
        table.string("email",20).notNullable();
        table.string("user_name",30).notNullable();
        table.string("password",20).notNullable();
        table.string("profile_name",60);
        table.string("address",60);
        table.string("city",60);
        table.string("state",60);
        table.integer("zip_code",10);
        table.string("bio",250);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(null);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
