// loginforgetpassword.cy.js
// End-to-End Cypress Tests for Forgot Password Functionality

describe('Forgot Password Page - Valid Registered Email', () => {
  it('should send reset email for valid registered email', () => {
    cy.visit('http://localhost:3000/login');
    cy.contains('Forgot Password?').click();

    cy.url().should('include', '/forgotPassword');

    cy.get('input').first().type('remember@example.com');
    cy.contains('Reset').click();

    // ✅ Exact message from the UI
    cy.contains('A link to reset your password have been sent to your email').should('exist');
  });
});

describe('Forgot Password Page - Unregistered Email', () => {
  it('should show "User not found" error for unknown email', () => {
    cy.visit('http://localhost:3000/login');
    cy.contains('Forgot Password?').click();

    cy.url().should('include', '/forgotPassword');

    cy.get('input').first().type('notregistered@example.com');
    cy.contains('Reset').click();

    cy.contains(/user not found/i).should('exist');
  });
});

describe('Forgot Password Page - Invalid Email Format (⚠ Known Bug)', () => {
  it('should show validation error for malformed email format', () => {
    cy.visit('http://localhost:3000/login');
    cy.contains('Forgot Password?').click();

    cy.url().should('include', '/forgotPassword');

    cy.get('input').first().type('invalidemail');
    cy.contains('Reset').click();

    // ❗Currently fails: Shows "User not found" instead of validation
    cy.contains(/enter a valid email/i).should('exist');
  });
});

describe('Forgot Password Page - Empty Email Field', () => {
  it('should show error when email field is left empty', () => {
    cy.visit('http://localhost:3000/login');
    cy.contains('Forgot Password?').click();

    cy.url().should('include', '/forgotPassword');

    cy.contains('Reset').click();
    cy.contains(/email is required/i).should('exist');
  });
});