
exports.up = function(knex) {
  return knex.schema.createTable('posts',(table)=>{
    table.increments("post_id").primary();
    table.string("body",250).notNullable();
    table.integer("created_by").unsigned().notNullable();
    table.foreign("created_by").references("users.user_id");
    table.integer("posted_to").unsigned();
    table.foreign("posted_to").references("profiles.profile_id")

  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('posts')
  
};
