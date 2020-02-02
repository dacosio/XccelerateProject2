
exports.up = function(knex) {
    return knex.schema.createTable('likes',(table)=>{
        table.increments("like_id").primary();
        table.integer("post_id").unsigned().notNullable();
        table.foreign("post_id").references("posts.post_id");
        table.integer("created_by").unsigned().notNullable();
        table.foreign("created_by").references("users.user_id");
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('likes');
};
