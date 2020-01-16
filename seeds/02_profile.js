exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(function () {
      console.log('running second seed?')
      // Inserts seed entries
      const profiles=[]
      return knex('profiles').insert([
        {f_name:'Tom',l_name:'Hanks',address:'XY Street',city:'Hong Kong',
        state:'Hong Kong',zip_code:12345,user_id:1},
        {f_name:'Girish',l_name:'Kanad',address:'Rohini',city:'Sector15',
        state:'Delhi',zip_code:880088,user_id:2},
    ]);
    });
};

