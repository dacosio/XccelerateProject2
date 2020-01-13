const express = require('express')
const router = express.Router()

const data = require('../database/CRUD')

//get all stuffs
router.get('/', (req,res) => {
    data.getAll()
        .then(alldata => {
            res.render('filename_of_hbs', alldata)
        })
})

router.get('/:id', (req,res,next) => {
    const id = req.params.id
    if(validId(id)) {
        data.getOneById(id)
            .then(dataById => {
                res.render('filename_of_hbs', dataById) //dataById is an object
            })
    }
    else {
        next(new Error('Invalid'))
    }
})

router.post('/', (req,res) => {
    if(validInput(req.body)) {
        const input = {//assuming this is the columns of our table
            title: req.body.title,
            description: req.body.description,
            imageURL: req.body.imageURL
        };
        //insert into the database
        data.create(input)
            .then(function(){
                data.getAll()
                .then(alldata => {
                    res.render('filename_of_hbs', alldata)
                })
            })
    }
    else {
        next(new Error('Invalid'))
    }
})


function validInput(input) {
    return typeof input.title == 'string' && input.title.trim() != ''; //assuming we have a title column in our database
  }
  

function validId(id) {
    return !isNaN
}

module.exports = router