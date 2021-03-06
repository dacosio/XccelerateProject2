const knex = require('../database/knex');

class PostService {
    constructor() {}

    getAll() {
        return knex('posts')
            .select();
    }

    getAllFormatted() {
        // return knex.raw(`select 
        //     p.post_id,
        //     u.user_name,
        //     p.description,
        //     p.created_at,
        //     p.created_by as created_id,
        //     CONCAT(u.first_name, ' ', u.last_name) as created_by,
        //     CONCAT(u2.first_name, ' ', u2.last_name) as created_to
        //     from posts p
        //     inner join users u
        //     on p.created_by = u.user_id
        //     inner join users u2
        //     on p.posted_to = u2.user_id`)   

        return knex
            .select('p.post_id', 'u.user_name', 'p.description', 'p.created_at', 'p.created_by AS created_id', 'u.first_name AS firstname1', 'u.last_name AS lastname1', 'u2.first_name AS firstname2', 'u2.last_name AS lastname2')
            .from('posts as p')
            .innerJoin('users AS u', 'p.created_by', 'u.user_id')
            .innerJoin('users AS u2', 'p.posted_to', 'u2.user_id')

    }

    getAllPostsForUser(id) {

        return knex.select('p.post_id', 'u.user_name', 'p.description', 'p.created_at', 'p.created_by AS created_id', 'u.first_name AS firstname1', 'u.last_name AS lastname1', 'u2.first_name AS firstname2', 'u2.last_name AS lastname2')
        .from('posts as p')
        .innerJoin('users AS u', 'p.created_by', 'u.user_id')
        .innerJoin('users AS u2', 'p.posted_to', 'u2.user_id')
        .where('p.created_by','=',id)
        .orWhere('p.posted_to', '=', id);
    }

    getPostsByUser(id){
        return knex
            .select('p.post_id', 'u.user_name', 'p.description', 'p.created_at', 'p.created_by AS created_id', 'u.first_name AS firstname1', 'u.last_name AS lastname1', 'u2.first_name AS firstname2', 'u2.last_name AS lastname2')
            .from('posts as p')
            .innerJoin('users AS u', 'p.created_by', 'u.user_id')
            .innerJoin('users AS u2', 'p.posted_to', 'u2.user_id')
            .where('p.created_by','=',id);
    }

    get(id) {
        return knex('posts')
            .where({
                post_id: id
            })
            .select();
    }

    create(obj) {
        return knex('posts')
            .returning('post_id')
            .insert(obj);
    }

    update(id, obj) {
        obj.updated_at = knex.fn.now()
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