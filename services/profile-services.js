const knex = require('../database/knex')




//get  profile

exports.getProfile = (req,res,next) => {
    knex.raw(`select f_name, l_name, address, city
    from profiles`)
        .then((data)=> {
            console.log(data)
            res.render('profile',{profileData: data.rows})
        })
}

//post to profile
exports.postToProfile =(req,res,next) => {
    knex.raw(`insert into posts (body,created_by,posted_to) values () `)
}





