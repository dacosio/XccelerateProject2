
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {description:'Nice picture',commented_by:3,post_id:1}
      ]);
    });
};
