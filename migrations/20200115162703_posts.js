
exports.up = function(knex) {
  return knex.schema.createTable('posts',(table)=>{
    table.increments("post_id").primary();
    table.string("body",250).notNullable();
    table.integer("created_by").unsigned().notNullable();
    table.foreign("created_by").references("users.user_id");
    table.integer("posted_to").unsigned().notNullable();
    table.foreign("posted_to").references("users.user_id");
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('posts')
  
};
