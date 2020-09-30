const request = require('supertest');
const server = 'http://localhost:3000';

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
describe('Google OAuth process', () => {

  describe('Contains Valid Google OAuth Credentials', () => {
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URL = process.env.REDIRECT_URL;
    it('shows that you have your credentials in an ENV file', () => {
      expect(typeof CLIENT_ID).toBe('string');
      expect(typeof CLIENT_SECRET).toBe('string');
      expect(typeof REDIRECT_URL).toBe('string');
    });
    it('client_id is valid', () => {
      expect(CLIENT_ID.slice(-4)).toBe('.com');
    })
  });

  describe('/api', () => {
    describe('/getAuthURL', () => {
      const correctURL = 'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&prompt=consent&client_id=265226410890-ccp33d5sp4nom25nvdf6pq3eq1bet230.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Flogin%2Fgoogle'
      it('responds with correct URL', (done) => {
        return request(server)
          .get('/api/getAuthURL')
          .expect(`Found. Redirecting to ${correctURL}`, done)
      });
    });
  });
  
});