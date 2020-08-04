const express = require('express');
const Controller = require('./index');

const router = express.Router();

router.get('/', list);
router.get('/:id', detail);

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

/**
 * GET /api/v1/songs/{id}
 * @summary Song detail
 * @param {number} id.path - song id
 * @return {Song} 200 - A song detail
*/
function detail (req, res) {
  Controller.detail(req.params.id)
    .then(song => res.status(200).json(song))
    .catch(({ message }) => res.status(500).json(message))

};

module.exports = router;
