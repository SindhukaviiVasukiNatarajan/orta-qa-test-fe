// cypress/e2e/registration.cy.js
// ✅ Cypress Automation Test Suite: Registration Page (Shift Manager)

describe('Registration Page - Full Test Suite', () => {

  const baseUrl = 'http://localhost:3000/register';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  // ✅ TC1: Register with existing email (Expected: Show "User already exists")
  it('should show error when trying to register with an existing email', () => {
    cy.get('input[name="name"]').type('Existing User');
    cy.get('input[name="email"]').type('john@example.com'); // Known existing user
    cy.get('input[name="password"]').type('StrongPass123!');
    cy.get('button[type="submit"]').click();

    cy.contains(/user already exists/i).should('exist'); // ✅ Actual result matched
  });

  // ❌ TC2: All fields empty → Should show friendly validation messages (BUG)
  it('should show validation error when all fields are empty', () => {
    cy.get('button[type="submit"]').click();

    // ❌ Actual: "Expected string but received undefined" (from backend)
    // ✅ Expected: Field-level errors: "Full name is required", etc.
    cy.contains(/full name is required/i).should('exist'); // Will FAIL if friendly message missing
  });

  // ❌ TC3: Full Name empty → should show "Full name is required" (BUG)
  it('should show validation error when full name is missing', () => {
    const randomEmail = `noname+${Date.now()}@example.com`;

    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type('StrongPass123!');
    cy.get('button[type="submit"]').click();

    cy.contains(/full name is required/i).should('exist'); // ❌ Actual: undefined error (backend)
  });

  // ✅ TC4: Invalid email format → should show "Please enter a valid email"
  it('should show validation error for invalid email format', () => {
    cy.get('input[name="name"]').type('Sindhu QA');
    cy.get('input[name="email"]').type('invalidemail.com');
    cy.get('input[name="password"]').type('StrongPass123!');
    cy.get('button[type="submit"]').click();

    cy.contains('div', 'Please enter a valid email')
      .should('be.visible');
  });

  // ✅ TC5: Password too short → show "Please enter a strong password"
  it('should show error for weak or short password', () => {
    const randomEmail = `shortpass+${Date.now()}@example.com`;

    cy.get('input[name="name"]').type('Short Pass');
    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click();

    cy.contains(/please enter a strong password/i).should('exist');
  });

  // ✅ TC6: Valid new registration → should redirect or show success
  it('should register successfully with valid new details', () => {
    const randomEmail = `newuser+${Date.now()}@example.com`;

    cy.get('input[name="name"]').type('Sindhu Kavi');
    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type('StrongPass123!');
    cy.get('button[type="submit"]').click();

    // ✅ Actual: redirected to Shift Dashboard
    cy.url().should('not.include', '/register');
    cy.contains('Post Shift').should('exist');
  });

  // ✅ TC7: Session persists without "Remember Me" checked (BUG - Session shouldn't persist)
  it('should NOT keep user logged in if "Remember Me" is unchecked', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="password"]').type('StrongPass123!');
    cy.get('input[name="remember"]').uncheck(); // ⚠️ Not selected
    cy.get('button[type="submit"]').click();

    // ✅ Assert logged in
    cy.contains('Post Shift').should('exist');

    // ❌ Refresh browser (simulate revisiting)
    cy.reload(); // or cy.visit again

    // ❌ Expected: Login screen should appear again
    cy.contains('Login').should('exist'); // BUG: Still logged in
  });

  // ✅ TC8: Name field only has spaces (Should fail with "Full name is required")
  it('should show error if full name is just spaces', () => {
    cy.get('input[name="name"]').type('     '); // Only spaces
    cy.get('input[name="email"]').type(`spaceuser+${Date.now()}@example.com`);
    cy.get('input[name="password"]').type('StrongPass123!');
    cy.get('button[type="submit"]').click();

    cy.contains(/full name is required/i).should('exist');
  });

  // ✅ TC9: Name field is extremely long (Should show error like "Full name too long")
  it('should show error when name field is extremely long', () => {
    const longName = 'A'.repeat(300); // 300-character name
    const randomEmail = `longname+${Date.now()}@example.com`;

    cy.get('input[name="name"]').type(longName);
    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type('StrongPass123!');
    cy.get('button[type="submit"]').click();

    cy.contains(/full name too long/i).should('exist'); 
  });

});