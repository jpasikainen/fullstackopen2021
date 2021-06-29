import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ user, blog, likeBlog, removeBlog }) => {
  const [show, toggleShow] = useState(false);
  const showBlog = () => {
    toggleShow(!show);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    lineHeight: 0.3,
  };

  const confirmBlogRemoval = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      removeBlog(blog);
    }
  };

  if (!show)
    return (
      <div style={blogStyle}>
        {blog.title}
        <button onClick={showBlog}>View</button>
      </div>
    );
  else
    return (
      <div style={blogStyle}>
        <button onClick={showBlog}>Hide</button>
        <p>{blog.title} {blog.author}</p>
        <p>{blog.url}</p>
        <span>likes {blog.likes} <button onClick={() => likeBlog(blog)}>Like</button></span>
        <p>{blog.user.name}</p>
        {user.name === blog.user.name &&
        <button onClick={() => confirmBlogRemoval(blog)}>Remove</button>}
      </div>
    );
};

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
