const express = require('express');
const Controller = require('./index');

const router = express.Router();

router.get('/', list);

/**
 * GET /api/v1/songs
 * @summary List of songs
 * @return {array<Song>} 200 - list of songs
*/
function list (req, res) {
  Controller.list()
    .then(songs => res.status(200).json(songs))
    .catch(({ message }) => res.status(500).json(message));
};

module.exports = router;
