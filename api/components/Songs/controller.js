const { nanoid } = require('nanoid');
const { validationResult } = require('express-validator');
const { errorGenerator, ERROR_TYPES } = require('../../../utils/errors');

const TABLE = 'songs';

module.exports = injectedStore => {
  const store = injectedStore;
  if (!store) {
    throw errorGenerator('Store dependency is required');
  }
  const detail = async (table, id) => {
    const songDetail = await store.detail(table, id);
    if (!songDetail) throw errorGenerator('Song not found', ERROR_TYPES.NOT_FOUND);
    return songDetail;
  };
  const remove = async (table, id) => {
    const removedSong = await store.remove(table, id);
    if (!removedSong) throw errorGenerator('Song not found', ERROR_TYPES.NOT_FOUND);
    return removedSong;
  };
  const create = async (table, req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw errorGenerator('Invalid inputs passed, please check your data', ERROR_TYPES.UNPROCESSABLE);
    }
    const { title, artist, year } = req.body;
    const createdSong = { title, artist, year };
    createdSong.id = nanoid();
    await store.create(table, createdSong);
    return createdSong;
  };
  const update = async (table, req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw errorGenerator('Invalid inputs passed, please check your data', ERROR_TYPES.UNPROCESSABLE);
    }
    const { title, artist, year } = req.body;
    const { id } = req.params;
    const song = {
      id, title, artist, year,
    };
    const updatedSong = await store.update(table, song);

    return updatedSong;
  };
  return {
    list: () => store.list(TABLE),
    detail: id => detail(TABLE, id),
    remove: id => remove(TABLE, id),
    create: req => create(TABLE, req),
    update: req => update(TABLE, req),
  };
};
