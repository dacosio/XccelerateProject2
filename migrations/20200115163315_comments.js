
exports.up = function(knex) {
    return knex.schema.createTable('comments',(table)=>{
        table.increments("comment_id").primary();
        table.string("description",250).notNullable();
        table.integer("commented_by").unsigned().notNullable();
        table.foreign("commented_by").references("users.user_id");
        table.integer("post_id").unsigned().notNullable();
        table.foreign("post_id").references("posts.post_id");
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('comments')
};
