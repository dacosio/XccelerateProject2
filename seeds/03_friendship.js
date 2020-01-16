exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('friendships').del()
    .then(function () {
      // Inserts seed entries
      return knex('friendships').insert([
        {user_1:1,user_2:2},
      ]);
    });
};
