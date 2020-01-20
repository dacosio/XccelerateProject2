
exports.up = function(knex) {
    return knex.schema.createTable('friends',(table)=>{
        table.increments("friends_id",2).primary();
        table.integer("user_1").unsigned().notNullable();
        table.foreign("user_1").references("users.user_id");
        table.integer("user_2").unsigned().notNullable();
        table.foreign("user_2").references("users.user_id");
        table.boolean("isAccepted").defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(null);

    })

};

exports.down = function(knex) {
    return knex.schema.dropTable('friends')
};


