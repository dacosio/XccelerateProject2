const knex = require('../database/knex');

class CommentService {
    constructor() {}

    getAll() {
        return knex('comments')
            .select();
    }

    getCommentsForPost(post_id) {
        return knex('comments')
            .where('post_id','=',post_id)
            .select();
    }

    getAllComments() {
        return knew.raw(
            `select p.post_id, c.description as commentdesc, c.commented_by, u.first_name, u.last_name, c.created_at
            from "comments" as "c"
            inner join "posts" as "p"
            on p.post_id = c.commented_by
            inner join users as u
            on c.commented_by = u.user_id
            `
        )
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
