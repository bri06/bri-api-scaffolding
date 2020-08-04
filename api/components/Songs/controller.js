const TABLE = 'songs';

module.exports = injectedStore => {
  const store = injectedStore;
  if (!store) {
    throw new Error('Store dependency is required');
  }
  const detail = async (table, id) => {
    const songDetail = await store.detail(table, id);
    if (!songDetail) throw new Error('not found');
    return songDetail;
  };
  return {
    list: () => store.list(TABLE),
    detail: id => detail(TABLE, id),
  };
};
