const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');
let loginToken = '';
let loginId = '';

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const user = {
    username: 'username',
    name: 'name',
    password: 'password',
  };

  const userInfo = await api.post('/api/users').send(user);
  loginId = userInfo.body.id;

  const login = await api.post('/api/login').send(user);
  loginToken = login.body.token;

  const initBlog = Blog({
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 123,
    user: loginId,
  });
  await initBlog.save();
});

describe('blogs api', () => {
  test('the right amount of blogs are returned in json', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(Object.keys(res.body).length).toEqual(1);
  });

  test('blog id property name does not contain underscore', async () => {
    const res = await api.get('/api/blogs').expect(200);
    expect(res.body[0].id).toBeDefined();
  });

  test('a new blog can be added using POST', async () => {
    const testBlog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 123,
      userId: loginId,
    };

    const blogsBefore = await api.get('/api/blogs').expect(200);
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginToken}`)
      .send(testBlog)
      .expect(201);
    const blogsAfter = await api.get('/api/blogs').expect(200);
    expect(blogsAfter.body.length).toBe(blogsBefore.body.length + 1);
  });

  test('a new blog cannot be added without token', async () => {
    const testBlog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 123,
      userId: loginId,
    };

    await api.post('/api/blogs').send(testBlog).expect(401);
  });

  test('if blog likes are not defined, set it to zero', async () => {
    const testBlog = {
      title: 'title',
      author: 'author',
      url: 'url',
      userId: loginId,
    };

    const res = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginToken}`)
      .send(testBlog)
      .expect(201);
    expect(res.body.likes).toBe(0);
  });

  test('if no title and url, return status code 400', async () => {
    const testBlog = {
      author: 'author',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginToken}`)
      .send(testBlog)
      .expect(400);
  });

  test('deleting post works', async () => {
    const id = await api.get('/api/blogs').expect(200);
    console.log(id.body[0].id);
    await api
      .delete(`/api/blogs/${id.body[0].id}`)
      .set('Authorization', `bearer ${loginToken}`)
      .expect(204);
  });

  test('updating post works', async () => {
    const id = await api.get('/api/blogs').expect(200);
    const updatedBlog = await api
      .put(`/api/blogs/${id.body[0].id}`)
      .send({ likes: 100 })
      .expect(200);
    expect(updatedBlog.body.likes).toBe(100);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
