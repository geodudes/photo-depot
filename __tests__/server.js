const request = require('supertest');
const server = 'http://localhost:3000';

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
      it('responds with 400 status when the route is nonsese', () => {
        return request(server)
          .get('/aklsjdfljasdfoiasf9jiaf')
          .expect(400);
      });
    });
  });

  describe('/images', () => {
    let photoid;
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/images')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);
      });

      it('returns a list of images in the body of response', () => {
        const imageList = [{
          "date": "today",
          "photoid": 1,
          "rating": 0,
          "tags": ["Monster Trucks"],
          "url": "https://s.hdnux.com/photos/01/10/02/10/18883120/8/920x920.jpg",
          "userid": "1"
        }];
        return request(server)
          .get('/images')
          .expect(200)
          .then(response => {
            expect([response.body[0]]).toEqual(imageList)
          })
      });
    });
    describe("POST", () => {
      it('responds with 200 status and application/json content type with photoid in body', () => {
        return request(server)
          .post('/images')
          .send({
            url: "https://www.english-efl.com/wp-content/uploads/2019/12/test.jpg"
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body).toEqual(expect.objectContaining({
              photoid: expect.any(Number)
            }))
            photoid = response.body.photoid;
          })

      });
    });
    describe("PUT", () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .put(`/images/${photoid}?rating=4`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

      });
    });
    describe("DELETE", () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .delete(`/images/${photoid}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
      });
    });
  });
  describe('/tags', () => {
    let tagid;
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/tags')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);
      });

      it('returns a list of images in the body of response', () => {
        const tagList = [{
          "tagid": 1,
          "tag": "Monster Trucks"
        }];
        return request(server)
          .get('/tags')
          .expect(200)
          .then(response => {
            expect([response.body[0]]).toEqual(tagList)
          })
      });
    });
    describe("POST", () => {
      it('responds with 200 status and application/json content type with photoid in body', () => {
        return request(server)
          .post('/tags')
          .send({
            tag: "Testing"
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body).toEqual(expect.objectContaining({
              tagid: expect.any(Number)
            }))
            tagid = response.body.tagid;
          })

      });
    });
    describe("PUT", () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .put(`/images/${tagid}?photoid=1`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
      });
    });
    describe("DELETE", () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .delete(`/images/${tagid}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
      });
    });
  });
});
