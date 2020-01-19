
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {body:"Happy Friyay!",created_by:1,posted_to:2},
        {body:"Everyone seems to fall in love and I'm here can't even fall asleep",created_by:3,posted_to:1}
      ]);
    });
};
