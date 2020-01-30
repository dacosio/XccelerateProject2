const knex = require('../database/knex')

class FriendService {
    constructor(){}

    getAll() {
        return knex('friends')
            .select()
    }

    getFriends(id){

        return knex
            .select('f.friends_id', 'f.isAccepted', 'f.user_1','u.first_name AS firstname1','u.last_name AS lastname1','f.user_2','u2.first_name AS firstname2','u2.last_name AS lastname2')
            .from('friends AS f')
            .innerJoin('users AS u', 'f.user_1','u.user_id')
            .innerJoin('users AS u2', 'f.user_2','u2.user_id')
            .where('f.user_1','=',id)
            .orWhere(`f.user_2`,'=',id)
            .andWhere('f.isAccepted','=',true)
            
    }

    getFriendRequests(id) {
        return knex
            .select('f.friends_id', 'f.isAccepted', 'f.user_1','u.first_name AS firstname1','u.last_name AS lastname1','f.user_2','u2.first_name AS firstname2','u2.last_name AS lastname2')
            .from('friends AS f')
            .innerJoin('users AS u', 'f.user_1','u.user_id')
            .innerJoin('users AS u2', 'f.user_2','u2.user_id')
            .where('f.user_1','=',id)
            .orWhere(`f.user_2`,'=',id)
            .andWhere('f.isAccepted','=',false)
                      
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
            .returning('friends_id')
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
