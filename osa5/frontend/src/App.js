import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [logged]);

  const createBlog = async (blogObject) => {
    try {
      const res = await blogService.addBlog(blogObject);
      setBlogs((blog) => [...blog, res]);

      setErrorMessage('Blog added successfully');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error);
      setErrorMessage('Blog could not be added');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));

      setLogged(true);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
    setLogged(false);
  };

  const likeBlog = async (blog) => {
    try {
      blog.likes += 1;
      await blogService.updateBlog(blog);

      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);

      setErrorMessage('Blog liked successfully');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error);
      setErrorMessage('Could not like the blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const removeBlog = async (blog) => {
    try {
      await blogService.removeBlog(blog);

      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);

      setErrorMessage('Blog removed successfully');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error);
      setErrorMessage('Could not remove the blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          username:
          <input
            id='username'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          password:
          <input
            id='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <br />
          <button id='login-button' type='submit'>
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>blogs</h2>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>Logout</button>

      <div>
        <h2>create new</h2>
        <BlogForm createBlog={createBlog} />
      </div>
      <div id='all-blogs'>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
