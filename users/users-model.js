const db = require('../data/db-config');

module.exports = {
  add,
  findById,
  findBy,
  get
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

function findBy(filter) {
  return db('users').where(filter).orderBy('id');
}

function get() {
  return db('users').select('id', 'username', 'department').orderBy('id');
}
