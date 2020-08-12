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
    return request(app)
      .get('/api/v1/songs/1')
      .expect(200)
      .then(response => expect(response.body).toEqual(expectedSong));
  });
  it('responds with error when sond id does not exists', () => request(app)
    .get('/api/v1/songs/1000')
    .expect(404));
  it('Should delete a song correctly', () => {
    const deletedSong = {
      id: 1, title: 'Song 1', artist: 'Artist 1', year: '2020',
    };
    return request(app)
      .delete('/api/v1/songs/1')
      .expect(200)
      .then(response => expect(response.body).toEqual(deletedSong));
  });
});
