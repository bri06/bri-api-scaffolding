const request = require('supertest');
const app = require('../../api');

describe('Components/Songs', () => {
  it('responds with json', () => request(app)
    .get('/api/v1/songs')
    .expect(200)
    .then(response => expect(response.body).toMatchSnapshot()));

  it('responds with song detail', () => {
    const expectedSong = {
      id: 1, title: 'Song 1', artist: 'Artist 1', year: 2020,
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
      id: 1, title: 'Song 1', artist: 'Artist 1', year: 2020,
    };
    return request(app)
      .delete('/api/v1/songs/1')
      .expect(200)
      .then(response => expect(response.body).toEqual(deletedSong));
  });
  it('Should create a song correctly', () => {
    const body = { title: 'New song', artist: 'New artist', year: 2020 };
    return request(app)
      .post('/api/v1/songs')
      .send(body)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body: res }) => {
        expect(res.title).toEqual(body.title);
        expect(res.artist).toEqual(body.artist);
        expect(res.year).toEqual(body.year);
      });
  });
  it('Should return 422 when the artist input is not sent', () => {
    const body = { title: 'New song', year: 2020 };
    return request(app)
      .post('/api/v1/songs')
      .send(body)
      .expect(422)
      .then(({ body: res }) => {
        expect(res.message).toEqual('Invalid inputs passed, please check your data');
        expect(res.type).toEqual('Unprocessable Entity');
      });
  });
  it('Should return 422 when the title input is not sent', () => {
    const body = { artist: 'New artist', year: 2020 };
    return request(app)
      .post('/api/v1/songs')
      .send(body)
      .expect(422)
      .then(({ body: res }) => {
        expect(res.message).toEqual('Invalid inputs passed, please check your data');
        expect(res.type).toEqual('Unprocessable Entity');
      });
  });
  it('Should return 422 when the year input is not sent', () => {
    const body = { title: 'New song', artist: 'New artist' };
    return request(app)
      .post('/api/v1/songs')
      .send(body)
      .expect(422)
      .then(({ body: res }) => {
        expect(res.message).toEqual('Invalid inputs passed, please check your data');
        expect(res.type).toEqual('Unprocessable Entity');
      });
  });
});
