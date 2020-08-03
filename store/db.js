const db = {
    songs: [
        { title: 'Song 1', artist: 'Artist 1', year: '2020' },
    ]
};

const list = async (tabla) => db[tabla] || [];

module.exports = {
    list,
};