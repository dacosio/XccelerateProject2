const knex = require('../database/knex')

class FriendService {
    constructor(){}

    getAll() {
        return knex('friends')
            .select()
    }

    getFriends(id){
        const sql = `select 
                f.friends_id,
                f.user_1,
                CONCAT(u.first_name, ' ', u.last_name) as "Friend1",
                f.user_2,
                CONCAT(u2.first_name, ' ', u2.last_name) as "Friend2",
                f."isAccepted",
                f.created_at,
                f.updated_at
                from friends f
                inner join users u
                on f.user_1 = u.user_id
                inner join users u2
                on f.user_2 = u2.user_id
                where f."isAccepted" = true
                and (f.user_1 = ${id} or f.user_2 = ${id})`;

        return knex.raw(sql)
        
        // return knex
        //     .select('f.friends_id','f.user_1','u.first_name AS firstname1','u.last_name AS lastname1','u2.first_name AS firstname2','u2.last_name AS lastname2')
        //     .from('friends AS f')
        //     .innerJoin('users AS u', 'f.user_1','u.user_id')
        //     .innerJoin('users AS u2', 'f.user_2','u2.user_id')
        //     .where('f.isAccepted','=','true')
        //     .andWhere('f.user_1',`${id}`)
        //     .orWhere(`f.user_2`,`${id}`)
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
