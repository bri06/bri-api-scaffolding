const TABLE = 'songs';

module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    throw new Error('Store dependency is required');
  }
  return {
    list: () => store.list(TABLE),
  };
};