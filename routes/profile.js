var express = require('express');
var router = express.Router();
const profile = require('../services/profile-services')

//get the specific user profile

router.get('/',profile.getProfile)


//get all posts of specific user profile


module.exports = router













