const cleaner = require('knex-cleaner');

function cleanTables(knex) {
  return cleaner
    .clean(knex, {
      mode: 'truncate',
      restartIdentity: true,
      ignoreTables: ['knex_migrations', 'knex_migrations_lock']
    })
    .then(() => console.log('\n *** Table truncated. Ready to seed. *** \n'));
}

exports.seed = function (knex) {
  return knex.raw('PRAGMA foreign_keys = OFF').then(() => cleanTables(knex));
};
