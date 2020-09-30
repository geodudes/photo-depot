const request = require('supertest');
const server = 'http://localhost:3000';

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
describe('Contains Google OAuth Credentials', () => {

  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URL = process.env.REDIRECT_URL;
  
  it('shows proper values for .env credentials', () => {
    expect(typeof CLIENT_ID).toBe('string');
    expect(typeof CLIENT_SECRET).toBe('string');
    expect(typeof REDIRECT_URL).toBe('string');
  });

});