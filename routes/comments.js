import { Router } from "express/lib/express";
const userComment = require('../services/comments-services')
//get all comments of the posts of specific post (post:/id)
router.get('/', (req,res,next) => {
    userComment.then((response) => {
        res.render('index', {records: response.rows})
    })
})
//get specific comment of post (comment:/id)

//create comment of specific post

//delete comment of specific post

//update comment of specific post