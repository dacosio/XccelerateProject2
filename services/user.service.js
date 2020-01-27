const knex = require('../database/knex');

class UserService {
    constructor(){}

    getAll() {
        return knex('users')
            .select();
    }

    get(id) {
        return knex('users')
            .where({
                user_id : id
            })
            .select();
    }

    getAllExceptUser(id) {
        return knex('users')
            .where('user_id','!=',id)
            .select('user_id','first_name', 'last_name')
    }

    searchUser(name){
        return knex('users')
            .whereRaw('LOWER(first_name) LIKE ? OR LOWER(last_name) LIKE ?',[name.toLowerCase()+"%", name.toLowerCase()+"%"])
            .select('user_id','first_name', 'last_name')
    }

    getOneByEmail(email) {
        return knex('users')
            .where('email', '=', email)
            .first()
    }

    create(user) {
        return knex('users')
            .insert(user)
            .returning('user_id');
    }

    update(id, user) {
        user.updated_at = knex.fn.now()
        return knex('users')
            .where('user_id', '=', id)
            .update(user);
    }

    delete(id) {
        return knex('users')
            .where('user_id', '=', id)
            .del();
    }
}

module.exports = UserService;