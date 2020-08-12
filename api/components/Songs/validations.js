const { check } = require('express-validator');

const songValidations = [
  check('title').not().isEmpty(),
  check('artist').not().isEmpty(),
  check('year').not().isEmpty().isInt(),
];

module.exports = {
  songValidations,
};
