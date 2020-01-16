exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      console.log('running first seed?')
      // Inserts seed entries
      return knex('users').insert([
        {first_name:'Tim',last_name:'Bill',email:'tim@abc.com',user_name:'tim',password:'abcd'},
        {first_name:'Alex',last_name:'Chan',email:'alex@gmail.com',user_name:'alex',password:'123'},
        {first_name:'Alan',last_name:'Robinson',email:'alan@abc.com',user_name:'alan',password:'abc'}
      ])
    
    });
};
