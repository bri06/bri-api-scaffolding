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
  return {
    list: () => store.list(TABLE),
    detail: id => detail(TABLE, id),
    remove: id => remove(TABLE, id),
  };
};
