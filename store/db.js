const db = {
  songs: [
    {
      id: 1, title: 'Song 1', artist: 'Artist 1', year: '2020',
    },
    {
      id: 2, title: 'Song 2', artist: 'Artist 2', year: '2020',
    },
    {
      id: 3, title: 'Song 3', artist: 'Artist 3', year: '2020',
    },
    {
      id: 4, title: 'Song 4', artist: 'Artist 4', year: '2020',
    },
    {
      id: 5, title: 'Song 5', artist: 'Artist 5', year: '2020',
    },
    {
      id: 6, title: 'Song 6', artist: 'Artist 6', year: '2020',
    },
    {
      id: 7, title: 'Song 7', artist: 'Artist 7', year: '2020',
    },
    {
      id: 8, title: 'Song 8', artist: 'Artist 8', year: '2020',
    },
    {
      id: 9, title: 'Song 9', artist: 'Artist 9', year: '2020',
    },
  ],
};

const list = async tabla => db[tabla] || [];
const detail = async (tabla, id) => {
  const collection = await list(tabla);
  const songDetail = collection.find(elem => elem.id === Number(id));
  return songDetail;
};

const remove = async (tabla, id) => {
  const collection = await list(tabla);
  const songId = Number(id);
  const song = collection.find(elem => elem.id === songId);
  db.songs = collection.filter(elem => elem.id !== songId);
  return song;
};

const create = async (tabla, data) => {
  db[tabla].push(data);
};

module.exports = {
  list,
  detail,
  remove,
  create,
};
