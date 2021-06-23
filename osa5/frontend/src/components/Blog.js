import React, { useState } from 'react';
const Blog = ({ blog }) => {
  const [show, toggleShow] = useState(false);
  const showBlog = () => {
    toggleShow(!show);
    console.log('wasd');
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    lineHeight: 0.3,
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
        <p>{blog.title}</p>
        <p>{blog.url}</p>
        <p>{blog.likes}</p>
        <p>{blog.user.name}</p>
      </div>
    );
};

export default Blog;
