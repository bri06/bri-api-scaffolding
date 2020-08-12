const express = require('express');
const Controller = require('./index');
const { handleHTTPError } = require('../../../utils/errors');

const router = express.Router();

/**
 * GET /api/v1/songs
 * @summary List of songs
 * @tags Songs - Everything about songs
 * @return {array<Song>} 200 - list of songs
*/
const list = (req, res) => {
  Controller.list()
    .then(songs => res.status(200).json(songs))
    .catch(handleHTTPError(res));
};

/**
 * GET /api/v1/songs/{id}
 * @summary Song detail
 * @param {number} id.path - song id
 * @tags Songs - Everything about songs
 * @return {Song} 200 - A song detail
 * @return {ErrorResponse} 400 - Bad request response
*/
const detail = (req, res) => {
  Controller.detail(req.params.id)
    .then(song => res.status(200).json(song))
    .catch(handleHTTPError(res));
};

/**
 * DELETE /api/v1/songs/{id}
 * @summary Endpoint to remove a song
 * @param {number} id.path - song id
 * @tags Songs - Everything about songs
 * @return {Song} 200 - Deleted song
 * @return {ErrorResponse} 400 - Bad request response
*/
const remove = (req, res) => {
  Controller.remove(req.params.id)
    .then(song => res.status(200).json(song))
    .catch(handleHTTPError(res));
};

router.get('/', list);
router.get('/:id', detail);
router.delete('/:id', remove);

module.exports = router;
