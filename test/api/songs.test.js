const request = require('supertest');
const app = require('../../api');

describe('Components/Songs', () => {
  it('responds with json', () => request(app)
    .get('/api/v1/songs')
    .expect(200)
    .then(response => expect(response.body).toMatchSnapshot()));

  it('responds with song detail', () => {
    const expectedSong = {
      id: 1, title: 'Song 1', artist: 'Artist 1', year: '2020',
    };
    request(app)
      .get('/api/v1/songs/1')
      .expect(200)
      .then(response => expect(response.body).toEqual(expectedSong));
  });
});
