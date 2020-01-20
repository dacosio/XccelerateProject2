exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {first_name:'Tim',last_name:'Bill',email:'tim@abc.com',user_name:'tim',password:'abcd',profile_name:'Tom',address:'XY Street',city:'Hong Kong',
        state:'Hong Kong',zip_code:12345},
        {first_name:'Alex',last_name:'Chan',email:'alex@gmail.com',user_name:'alex',password:'123',profile_name:'Girish',address:'Rohini',city:'Sector15',
        state:'Delhi',zip_code:880088},
        {first_name:'Alan',last_name:'Robinson',email:'alan@abc.com',user_name:'alan',password:'abc',profile_name:'Priyanka',address:'Delhi',city:'Delhi',
        state:'Delhi',zip_code:123456}
      ])
    
    });
};
