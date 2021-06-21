const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const baseUrl = '/api/users';

const User = require('../models/user');
beforeEach(async () => {
  await User.deleteMany({});

  const initBlog = User({
    username: 'User',
    name: 'Test User',
    password: '1234',
  });
  await initBlog.save();
});

describe('users api', () => {
  test('too short username', async () => {
    const testUser = {
      username: 'u',
      name: 'Test User',
      password: '1234',
    };
    await api.post(baseUrl).send(testUser).expect(400);
  });

  test('too short password', async () => {
    const testUser = {
      username: 'username',
      name: 'Test User',
      password: '1',
    };
    await api.post(baseUrl).send(testUser).expect(400);
  });

  test('legit user can be created', async () => {
    const testUser = {
      username: 'legit',
      name: 'Test User',
      password: '1234',
    };
    await api.post(baseUrl).send(testUser).expect(200);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
