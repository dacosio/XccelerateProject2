const knex = require('../database/knex');

class CommentService {
    constructor() {}

    getAll() {
        return knex('comments')
            .select();
    }

    get(id) {
        return knex('comments')
            .where({
                comment_id : id
            })
            .select();
    }

    create(obj) {
        return knex('comments')
            .returning('comment_id')
            .insert(obj);
    }

    update(id,obj) {
        obj.updated_at = knex.fn.now()
        return knex('comments')
            .where('comment_id','=',id)
            .update(obj);
    }

    delete(id) {
        return knex('comments')
            .where('comment_id','=',id)
            .del()
    }

}

module.exports = CommentService;
