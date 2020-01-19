const knex = require('../database/knex');

class PostService {
    constructor(){}

    getAll() {
        return knex('posts')
            .select();
    }

    get(id) {
        return knex('posts')
            .where({
                post_id : id
            })
            .select('*');
    }

    create(obj) {
        return knex('posts')
            .returning('post_id')
            .insert(obj);
    }

    update(id, obj) {
        return knex('posts')
            .where('post_id', '=', id)
            .update(obj);
    }

    delete(id) {
        return knex('posts')
            .where('post_id', '=', id)
            .del();
    }
}

module.exports = PostService;