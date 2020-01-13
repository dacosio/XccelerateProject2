//this is the database connection

const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment] //only take development from knexfile


module.exports = require('knex')(config) //this is equal to development

