const knex = require('../database/knex')


exports.getPostById = (req,res,next)=> {
    knex.raw(`select 
    p.post_id "Post_ID", p.body "Post_Body", 
    concat(pu.first_name, ' ', pu.last_name) "Posted_By", pu.email "Email", 
    c.description "Comment", 
    concat(u.first_name, ' ', u.last_name) "Commented_By"
    from 
    posts p
    inner join 
    users pu 
    on 
    p.created_by = pu.user_id
    left join 
    comments c
    on 
    p.post_id = c.post_id
    left join 
    users u
    on 
    u.user_id = c.commented_by`)
.then(suruchi => {
    console.log(suruchi)
  //   res.json(data);
    res.render('posts', {postsData: suruchi.rows})
 })
}