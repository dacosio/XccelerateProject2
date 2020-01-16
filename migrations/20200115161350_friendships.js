
exports.up = function(knex) {
    return knex.schema.createTable('friendships',(table)=>{
        table.increments("friendship_id",2).primary();
        table.integer("user_1").unsigned().notNullable();
        table.foreign("user_1").references("users.user_id");
        table.integer("user_2").unsigned().notNullable();
        table.foreign("user_2").references("users.user_id");


    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('friendships')
};
