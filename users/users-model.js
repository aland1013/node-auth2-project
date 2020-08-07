const db = require('../data/db-config');

module.exports = {
  add,
  findById
};

async function add(user) {
  try {
    const [id] = await db('users').insert(user, 'id');

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db('users').where({ id }).first();
}
