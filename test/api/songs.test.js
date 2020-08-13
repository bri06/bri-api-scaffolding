const request = require('supertest');
const app = require('../../api');

describe('Components/Songs', () => {
  describe('GET songs', () => {
    it('responds with json', () => request(app)
      .get('/api/v1/songs')
      .expect(200)
      .then(response => expect(response.body).toMatchSnapshot()));
  });

  describe('GET song by id', () => {
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
  });
  describe('DELETE song', () => {
    it('Should delete a song correctly', () => {
      const deletedSong = {
        id: 1, title: 'Song 1', artist: 'Artist 1', year: 2020,
      };
      return request(app)
        .delete('/api/v1/songs/1')
        .expect(200)
        .then(response => expect(response.body).toEqual(deletedSong));
    });
  });

  describe('POST song', () => {
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
    it('Should return 400 when the artist input is not sent', () => {
      const body = { title: 'New song', year: 2020 };
      return request(app)
        .post('/api/v1/songs')
        .send(body)
        .expect(400)
        .then(({ body: res }) => {
          expect(res.message).toEqual('Invalid inputs passed, please check your data');
          expect(res.type).toEqual('Unprocessable Entity');
        });
    });
    it('Should return 400 when the title input is not sent', () => {
      const body = { artist: 'New artist', year: 2020 };
      return request(app)
        .post('/api/v1/songs')
        .send(body)
        .expect(400)
        .then(({ body: res }) => {
          expect(res.message).toEqual('Invalid inputs passed, please check your data');
          expect(res.type).toEqual('Unprocessable Entity');
        });
    });
    it('Should return 400 when the year input is not sent', () => {
      const body = { title: 'New song', artist: 'New artist' };
      return request(app)
        .post('/api/v1/songs')
        .send(body)
        .expect(400)
        .then(({ body: res }) => {
          expect(res.message).toEqual('Invalid inputs passed, please check your data');
          expect(res.type).toEqual('Unprocessable Entity');
        });
    });
  });
  describe('PUT song', () => {
    it('Should update a song correctly', () => {
      const body = {
        id: 1, title: 'Updated song', artist: 'Updated artist', year: 2020,
      };
      return request(app)
        .put('/api/v1/songs/1')
        .send(body)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(({ body: res }) => {
          expect(res.title).toEqual(body.title);
          expect(res.artist).toEqual(body.artist);
          expect(res.year).toEqual(body.year);
        });
    });
    it('Should return 400 when the artist input is not sent', () => {
      const body = { title: 'New song', year: 2020 };
      return request(app)
        .put('/api/v1/songs/1')
        .expect('Content-Type', /json/)
        .send(body)
        .expect(400)
        .then(({ body: res }) => {
          expect(res.message).toEqual('Invalid inputs passed, please check your data');
          expect(res.type).toEqual('Unprocessable Entity');
        });
    });
    it('Should return 400 when the title input is not sent', () => {
      const body = { artist: 'New artist', year: 2020 };
      return request(app)
        .put('/api/v1/songs/1')
        .expect('Content-Type', /json/)
        .send(body)
        .expect(400)
        .then(({ body: res }) => {
          expect(res.message).toEqual('Invalid inputs passed, please check your data');
          expect(res.type).toEqual('Unprocessable Entity');
        });
    });
    it('Should return 400 when the year input is not sent', () => {
      const body = { title: 'New song', artist: 'New artist' };
      return request(app)
        .put('/api/v1/songs/1')
        .expect('Content-Type', /json/)
        .send(body)
        .expect(400)
        .then(({ body: res }) => {
          expect(res.message).toEqual('Invalid inputs passed, please check your data');
          expect(res.type).toEqual('Unprocessable Entity');
        });
    });
  });
});
