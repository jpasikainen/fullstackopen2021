const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: request.user,
  });

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const savedBlog = await blog.save();

  const user = await User.findById(body.userId);
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (request.user !== blog.user.toString()) {
      return response.status(401).json({ error: 'token does not match' });
    }

    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
);

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
