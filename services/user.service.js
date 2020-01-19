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
            .select('*');
    }

    create(obj) {
        return knex('users')
            .returning('user_id')
            .insert(obj);
    }

    update(id, obj) {
        return knex('users')
            .where('user_id', '=', id)
            .update(obj);
    }

    delete(id) {
        return knex('users')
            .where('user_id', '=', id)
            .del();
    }
}

module.exports = UserService;