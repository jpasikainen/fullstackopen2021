const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes,
    0
  );
};

const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.reduce(
    (accumulator, currentValue) =>
      accumulator.likes > currentValue.likes ? accumulator : currentValue,
    {}
  );
  delete favoriteBlog.__v;
  delete favoriteBlog._id;
  return favoriteBlog;
};

const mostBlogs = (blogs) => {
  // Not the most efficient way but good enough
  let authors = {};
  blogs.forEach((blog) => {
    if (blog.author in authors) authors[blog.author] += 1;
    else authors[blog.author] = 1;
  });

  let topAuthor = { author: '', blogs: 0 };
  for (let author in authors) {
    if (authors[author] > topAuthor.blogs) {
      topAuthor.author = author;
      topAuthor.blogs = authors[author];
    }
  }
  return topAuthor;
};

const mostLikes = (blogs) => {
  let authors = {};
  blogs.forEach((blog) => {
    if (blog.author in authors) authors[blog.author] += blog.likes;
    else authors[blog.author] = blog.likes;
  });

  let topAuthor = { author: '', likes: 0 };
  for (let author in authors) {
    if (authors[author] > topAuthor.likes) {
      topAuthor.author = author;
      topAuthor.likes = authors[author];
    }
  }
  return topAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
