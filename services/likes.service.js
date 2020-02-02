const knex = require('../database/knex');

class LikesService {
    constructor() {}

    getAll() {
        return knex('likes')
            .select();
    }

    getAllLikesForPost(post_id){
        return knex('likes')
            .where('post_id', '=', post_id)
            .select();
    }

    get(id) {
        return knex('like')
            .where({
                like_id : id
            })
            .select();
    }

    create(obj) {
        return knex('likes')
            .returning('like_id')
            .insert(obj);
    }

    update(id,obj) {
        return knex('likes')
            .where('like_id','=',id)
            .update(obj);
    }

    delete(id) {
        return knex('likes')
            .where('like_id','=',id)
            .del()
    }

    deleteLike(id, post_id) {
        return knex('likes')
            .where(function(){
                this.where('created_by','=',id).andWhere('post_id','=',post_id)
            })
            .del();
    }
}

module.exports = LikesService;
