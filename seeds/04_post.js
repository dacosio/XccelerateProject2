
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {body:"Examination fever..2 days to go",created_by:1,posted_to:2},
        {body:"Holidayssss..",created_by:3,posted_to:1}
      ]);
    });
};
