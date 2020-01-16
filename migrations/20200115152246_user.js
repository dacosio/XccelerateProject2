
exports.up = function(knex) {
    return knex.schema.createTable('users',(table)=>{
        table.increments("user_id",2).primary();
        table.string("first_name",80).notNullable();
        table.string("last_name",80).notNullable();
        table.string("email",20).notNullable();
        table.string("user_name",30).notNullable();
        table.string("password",20).notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
