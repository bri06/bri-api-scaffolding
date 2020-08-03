const request = require('supertest');
const app = require('../../../api');

describe('GET /user', () => {
  it('responds with json', () => {
    return request(app)
      .get('/api/v1/songs')
      .expect(200)
      .then(response => console.log(response.body));
  });
});
