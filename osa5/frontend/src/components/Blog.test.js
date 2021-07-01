import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const blog = {
  title: 'title',
  author: 'author',
  url: 'url',
  likes: 1,
  user: {
    name: 'name',
  },
};

const user = {};

const emptyFunc = () => {};

test('blog renders only title and author', () => {
  const component = render(
    <Blog blog={blog} user={user} likeBlog={emptyFunc} removeBlog={emptyFunc} />
  );
  // Only true when there are no other elements present, url etc.
  const element = component.getByText('title author');
  expect(element).toBeDefined();
});

test('blog shows url and likes when expanded', async () => {
  const component = render(
    <Blog blog={blog} user={user} likeBlog={emptyFunc} removeBlog={emptyFunc} />
  );
  const button = component.getByText('View');
  fireEvent.click(button);
  let element = component.getByText('url');
  expect(element).toBeDefined();
  element = component.getByText('likes 1');
  expect(element).toBeDefined();
});

test('like button fires twice when clicked twice', async () => {
  const mockHandler = jest.fn();
  const component = render(
    <Blog
      blog={blog}
      user={user}
      likeBlog={mockHandler}
      removeBlog={emptyFunc}
    />
  );
  let button = component.getByText('View');
  fireEvent.click(button);
  button = component.getByText('Like');
  fireEvent.click(button);
  fireEvent.click(button);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
