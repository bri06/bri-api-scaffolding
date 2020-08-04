const TABLE = 'songs';

module.exports = injectedStore => {
  const store = injectedStore;
  if (!store) {
    throw new Error('Store dependency is required');
  }
  return {
    list: () => store.list(TABLE),
    detail: id => store.detail(TABLE, id),
  };
};
