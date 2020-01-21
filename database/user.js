const knex = require ('../database/knex')

module.exports = {
    getOne: function(id) {
        return knex ('users').where('user_id',id).first();
    },
    getOneByEmail : function(email) {
        return knex ('users').where('email', email).first();

    }
}
