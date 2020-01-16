
exports.up = function(knex) {
    return knex.schema.createTable('profiles',(table)=>{
        table.increments("profile_id",2).primary();
        table.string("f_name",60);
        table.string("l_name",60);
        table.string("address",60).notNullable();
        table.string("city",60).notNullable();
        table.string("state",60).notNullable();
        table.integer("zip_code",10).notNullable()
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("users.user_id");

      });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('profiles')
};

