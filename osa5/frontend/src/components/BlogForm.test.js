import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test('Affirm that the blog creation function is called with correct values', () => {
  const mockHandler = jest.fn();
  const component = render(<BlogForm createBlog={mockHandler} />);
  const button = component.getByText('Create new blog');
  fireEvent.click(button);

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { value: 'title' },
  });
  fireEvent.change(author, {
    target: { value: 'author' },
  });
  fireEvent.change(url, {
    target: { value: 'url' },
  });
  fireEvent.submit(form);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0]).toStrictEqual({
    title: 'title',
    author: 'author',
    url: 'url',
  });
});
