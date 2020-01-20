const knex = require('../database/knex')

class FriendService {
    constructor(){}

    getAll() {
        return knex('friends')
            .select()
    }

    get(id){
        return knex('friends')
            .where({
                friends_id: id
            })
            .select();
    }

    create(obj) {
        return knex('friends')
            .returning('friends')
            .insert(obj)
    }

    update(id,obj){
        obj.updated_at = knex.fn.now()
        return knex('friends')
            .where('friends_id', '=', id)
            .update(obj);
    }

    delete(id){
        return knex('friends')
            .where('friends_id', '=', id)
            .del()
    }

}

module.exports = FriendService;
