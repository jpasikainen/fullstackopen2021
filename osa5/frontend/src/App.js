import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [logged]);

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

  const handleLogout = (event) => {
    window.localStorage.clear();
    window.location.reload();
    setLogged(false);
  };

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          username:
          <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          password:
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <br />
          <button type='submit'>Login</button>
        </form>
      </div>
    );
  }

  const handleCreate = async (event) => {
    try {
      event.preventDefault();
      const blog = {
        title: title,
        author: author,
        url: url,
      };

      const res = await blogService.addBlog(blog);
      setBlogs((blog) => [...blog, res]);

      setTitle('');
      setAuthor('');
      setUrl('');

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

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>blogs</h2>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>Logout</button>

      <div>
        <h2>create new</h2>
        <form onSubmit={handleCreate}>
          title:
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
          author:
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          url:
          <input
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <button type='submit'>create</button>
        </form>
      </div>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
