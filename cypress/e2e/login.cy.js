// login.cy.js
// End-to-End Cypress Tests for Login Functionality (Positive + Negative Scenarios)

describe('Login Page - Valid Login', () => {
  it('should log in with valid credentials and redirect to dashboard', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="password"]').type('StrongPass123!');
    cy.get('button[type="submit"]').click();

    cy.url().should('not.include', '/login'); // Redirected
    cy.contains('Post Shift').should('exist');
    cy.get('button').contains('Logout').should('exist');
    cy.contains(/^Welcome, /i).should('exist'); // General welcome message
  });
});

describe('Login Page - Invalid Email Format (⚠ Known Bug)', () => {
  it('should show validation error for malformed email format', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[name="email"]').type('john@com'); // Invalid format
    cy.get('input[name="password"]').type('StrongPass123!');
    cy.get('button[type="submit"]').click();

    // ❗Currently fails: Instead of frontend validation, shows "User does not exist"
    // Expected:
    cy.contains(/valid email/i).should('exist');
  });
});

describe('Login Page - Invalid Password', () => {
  it('should show error for valid email but wrong password', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="password"]').type('WrongPassword123!');
    cy.get('button[type="submit"]').click();

    cy.contains(/invalid credentials/i).should('exist');
  });
});

describe('Login Page - Empty Email & Password', () => {
  it('should show validation error for both fields empty', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('button[type="submit"]').click();
    cy.contains(/please enter all fields/i).should('exist');
  });
});

describe('Login Page - Valid Email & Empty Password', () => {
  it('should show validation error when password is empty', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('button[type="submit"]').click();
    cy.contains(/please enter all fields/i).should('exist');
  });
});

describe('Login Page - Empty Email & Valid Password', () => {
  it('should show validation error when email is empty', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="password"]').type('StrongPass123!');
    cy.get('button[type="submit"]').click();
    cy.contains(/please enter all fields/i).should('exist');
  });
});

describe('Login Page - Unregistered Email', () => {
  it('should show error for email not in the system', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[name="email"]').type('random@email.com');
    cy.get('input[name="password"]').type('StrongPass123!');
    cy.get('button[type="submit"]').click();

   
    cy.contains(/user does not exist/i).should('exist');
  });
});