exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('friends').del()
    .then(function () {
      // Inserts seed entries
      return knex('friends').insert([
        {user_1:1,user_2:2, isAccepted:0},
      ]);
    });
};
