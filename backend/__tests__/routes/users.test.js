const mongoose = require('mongoose');
require('dotenv').config();

const requests = require('../../utility/api');
const User = require('../../models/User');

describe('Testing all /users end points', () => {
  beforeAll(() => {
    const testDb = process.env.MONGODB_TEST_URI;
    mongoose.connect(
      testDb,
      {
        useNewUrlParser: true,
      }
    );
  });

  afterAll(done => {
    mongoose.disconnect(done);
  });

  const goodUser = {
    user: {
      username: 'test',
      email: 'test@email.com',
      password: 'test123',
    },
  };

  const badUser = {
    user: {
      username: 'test_user',
      email: '',
      password: 'just_a_test',
    },
  };

  describe('Testing user registration', () => {
    const url = '/users';

    afterEach(() => {
      return User.deleteMany({ username: /test/ }).exec();
    });

    it('should register user and return a token', async () => {
      const response = await requests.post(url, goodUser);
      const { data } = response;

      expect(Object.keys(data.user).length).toEqual(3);
      expect(Object.keys(data.user)).toContain('token');
      expect(data.user.email).toEqual(goodUser.user.email);
      expect(data.user.token.length).toBeGreaterThan(100);
    });

    it('should throw a 422 validation error', () => {
      requests
        .post(url, badUser)
        .catch(err => expect(err.response.status).toEqual(422));
    });
  });

  describe('Testing user login and user update', () => {
    const url = '/users/login';

    beforeEach(() => {
      const user = new User();

      user.username = goodUser.user.username;
      user.email = goodUser.user.email;
      user.setPassword(goodUser.user.password);

      return user.save(user);
    });

    afterEach(() => {
      return User.deleteMany({ username: /test/ }).exec();
    });

    const goodUserLogin = {
      user: {
        email: goodUser.user.email,
        password: goodUser.user.password,
      },
    };

    const badUserLogin = {
      user: {
        email: '',
        password: goodUser.user.password,
      },
    };

    it('should return user login details and token', async () => {
      const loginResponse = await requests.post(url, goodUserLogin);
      const { data } = loginResponse;

      // Test login
      expect(Object.keys(data.user).length).toEqual(3);
      expect(Object.keys(data.user)).toContain('token');
      expect(data.user.email).toEqual(goodUser.user.email);
      expect(data.user.token.length).toBeGreaterThan(100);

      // Test retrieving login details
      const getLoginResponse = await requests.get('/users', data.user.token);
      const loginData = getLoginResponse.data;

      expect(Object.keys(loginData.user).length).toEqual(3);
      expect(Object.keys(loginData.user)).toContain('token');
      expect(loginData.user.email).toEqual(goodUser.user.email);
      expect(loginData.user.token.length).toBeGreaterThan(100);
    });

    it('should throw a 422 validation error', () => {
      requests
        .post(url, badUserLogin)
        .catch(err => expect(err.response.status).toEqual(422));
    });

    it('should return user profile', async () => {
      const url = `/profile/${goodUser.user.username}`;
      const response = await requests.get(url);
      const { data } = response;

      expect(data.profile.email).toEqual(goodUser.user.email);
      expect(data.profile.username).toEqual(goodUser.user.username);
    });

    it('should update user details', async () => {
      const loginUrl = '/users/login';
      const loginResponse = await requests.post(loginUrl, goodUserLogin);
      const { data } = loginResponse;

      const updateUrl = `/users/update`;
      const requestBody = {
        user: {
          username: goodUser.user.username,
          email: goodUser.user.email,
          bio: 'This is just a test',
        },
      };
      const response = await requests.put(
        updateUrl,
        requestBody,
        data.user.token
      );

      expect(response.data.user.username).toEqual(requestBody.user.username);
    });
  });
});
