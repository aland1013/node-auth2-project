const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');

/* ----- GET /api/users ----- */
router.get('/', restricted, (req, res) => {
  Users.findByDept({ department: req.decodedJwt.department })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
