const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets');
const router = require('express').Router();

const Users = require('../users/users-model');
const { isValid } = require('../users/users-service');

/* ----- POST /api/auth/register ----- */
router.post('/register', (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcrypt.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: 'please provide username and an alphanumeric password'
    });
  }
});

module.exports = router;
