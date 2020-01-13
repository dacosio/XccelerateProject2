const knex = require('./knex')


module.exports = {
    getAll: function() {
        return knex('name_of_table').select()
    },        


    getOneById: function(id) {
       return knex('name_of_table').where('id', id).first()
     },

    create: function (input) {
        return knex('name_of_table').insert(input)
        
    }
}


