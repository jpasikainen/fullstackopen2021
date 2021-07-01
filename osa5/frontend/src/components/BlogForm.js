import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [visible, setVisibility] = useState(false);

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
    toggleVisibility();
  };

  const toggleVisibility = () => {
    setVisibility(!visible);
  };

  if (!visible)
    return (
      <div>
        <button onClick={toggleVisibility}>Create new blog</button>
      </div>
    );
  else
    return (
      <div>
        <form onSubmit={addBlog}>
          title:
          <input
            id='title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
          author:
          <input
            id='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          url:
          <input
            id='url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <button id='blog-button' type='submit'>
            create
          </button>
        </form>
        <button onClick={toggleVisibility}>Hide</button>
      </div>
    );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
