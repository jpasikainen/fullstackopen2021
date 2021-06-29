import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const addBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(baseUrl, blog, config);
  return request.data;
};

const updateBlog = async (blog) => {
  const blogId = blog.id;
  const userId = blog.user.id;
  delete blog.id;
  blog.user = userId;

  const config = {
    headers: { Authorization: token }
  };
  const request = await axios.put(`${baseUrl}/${blogId}`, blog, config);
  return request.data;
};

const removeBlog = async (blog) => {
  const blogId = blog.id;
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseUrl}/${blogId}`, config);
  return request.data;
};

export default { getAll, setToken, addBlog, updateBlog, removeBlog };
