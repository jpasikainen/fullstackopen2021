describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'testaaja',
      username: 'username',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in');
  });

  it('user can login', function () {
    cy.get('#username').type('username');
    cy.get('#password').type('password');
    cy.get('#login-button').click();
    cy.contains('testaaja logged in');
  });

  it('fake user cant login', function () {
    cy.get('#username').type('wasd');
    cy.get('#password').type('password');
    cy.get('#login-button').click();
    cy.contains('Log in');
  });

  it('blog can be created', function () {
    cy.get('#username').type('username');
    cy.get('#password').type('password');
    cy.get('#login-button').click();

    cy.contains('Create new blog').click();
    cy.get('#title').type('title');
    cy.get('#author').type('author');
    cy.get('#url').type('url');
    cy.get('#blog-button').click();

    cy.contains('title author');
  });

  it('blog can be liked', function () {
    cy.get('#username').type('username');
    cy.get('#password').type('password');
    cy.get('#login-button').click();

    cy.contains('Create new blog').click();
    cy.get('#title').type('title');
    cy.get('#author').type('author');
    cy.get('#url').type('url');
    cy.get('#blog-button').click();

    cy.contains('View').click();
    cy.contains('Like').click();
    cy.contains('likes 1');
  });

  it('blog can be removed', function () {
    cy.get('#username').type('username');
    cy.get('#password').type('password');
    cy.get('#login-button').click();

    cy.contains('Create new blog').click();
    cy.get('#title').type('title');
    cy.get('#author').type('author');
    cy.get('#url').type('url');
    cy.get('#blog-button').click();

    cy.contains('View').click();
    cy.contains('Remove').click();
    cy.contains('removed');
  });

  it('blogs are ordered properly', function () {
    cy.get('#username').type('username');
    cy.get('#password').type('password');
    cy.get('#login-button').click();

    cy.contains('Create new blog').click();
    cy.get('#title').type('title');
    cy.get('#author').type('author');
    cy.get('#url').type('url');
    cy.get('#blog-button').click();

    cy.contains('Create new blog').click();
    cy.get('#title').type('title2');
    cy.get('#author').type('author2');
    cy.get('#url').type('url2');
    cy.get('#blog-button').click();

    cy.wait(500);

    // Open the first blog and then the second block
    // Now the Hide click closes the first block
    // The Like button belongs to the second blog

    cy.get('#all-blogs').contains('View').click();
    cy.get('#all-blogs').contains('View').click();
    cy.get('#all-blogs').contains('Hide').click();
    cy.get('#all-blogs').contains('Like').click();
    cy.get('#all-blogs').contains('Hide').click();

    cy.wait(500);

    cy.get('#all-blogs>div>span').then((elements) => {
      expect(elements[1].textContent).to.equal('title author');
      expect(elements[0].textContent).to.equal('title2 author2');
    });
  });
});
