# 🐞 BUG REPORT - Manual Testing Summary

Author: Sindhu Kavii Vasuki Natarajan
Project: ORTA Shift Management App  
Date: July 2025  
Environment: Web App (Login/Registration + Shift Dashboard)

---

## 🔍 Test Scope

The following pages and features were tested manually under normal and edge-case conditions:
- Login Page
- Registration Page
- Shift Dashboard (Add/Delete/Complete/Logout behavior)

Testing focused on functionality, user input validation, and basic UX behavior across multiple usage paths.

## 🧪 LOGIN PAGE

### 🐞 1. Invalid Email Format Not Validated

**Steps to Reproduce:**
1. Go to Login page
2. Enter:  
   - Email: `john@com`  
   - Password: `StrongPass123!`  
3. Click Login

**Expected:**  
Should show “Please enter a valid email”

**Actual:**  
Shows “User does not exist”

**Severity:** Medium  
**Type:** Frontend Validation  (Functional)

📸 Screenshot:
See login-invalid-email-format.png under /screenshots/ folder.

---
## 🧪 LOGIN PAGE

### 📝 Additional UX Observations (Not Bugs – For Improvement Only)

- ⚠️ **Empty Email + Valid Password:**  
  Shows: “Please enter all fields”  
  Suggest: Show more helpful message like “Email is required”.

- ⚠️ **Valid Email + Empty Password:**  
  Shows: “Please enter all fields”  
  Suggest: “Password is required” for clearer UX.

📝 _These are not functional bugs but UX improvement suggestions._

## 🧪REGISTRATION PAGE

### 🐞 2. All Fields Empty Shows Raw System Error

**Steps to Reproduce:**
1. Go to Registration page  
2. Leave Full Name, Email, Password blank  
3. Click Register

**Expected:**  
Should show:  
- "Full name is required"  
- "Email is required"  
- "Password is required"

**Actual:**  
Error: “Expected a string but received undefined”

**Severity:** Medium  
**Type:** Validation + UX  

📸 Screenshot:
See registration-empty-fields-error.png under /screenshots/ folder.

---

### 📝 3. Full Name Empty Shows Raw System Error


**Steps to Reproduce:**
1. Fill Email and Password  
2. Leave Full Name blank  
3. Click Register

**Expected:**
Should show a field-specific validation message like:

“Full Name is required”

**Actual:**
Shows raw error message:

“Expected string but received undefined”


**Severity:** Medium 
**Type:** Validation + UX

📸 Screenshot:
See registration-fullname-missing.png under /screenshots/ folder.
---

### 📝 4. No Success Message After Registration

📝 _Note: This is not a critical bug. It is a UX suggestion for better field-specific feedback._

**Steps to Reproduce:**
1. Register with valid fields  
2. Click Register

**Expected:** Show “Registration Successful” before redirect  
**Actual:** Redirects without any confirmation

**Severity:** Low  
**Type:** UX Suggestion



---

### 🐞 5. Facebook / Twitter Buttons Do Nothing

**Steps to Reproduce:**
1. On Register or Login page, click:  
   - “Continue with Facebook”  
   - “Continue with Twitter”

**Expected:** OAuth redirect or “Coming soon” message  
**Actual:** No action, no feedback

**Severity:** Medium  
**Type:** UI/UX Bug


---


## 📦 SHIFT MANAGEMENT

### 🐞 6. Deleted Shift Reappears After Refresh

**Steps:**
1. Add new shift  
2. Delete the shift  
3. Refresh page

**Expected:** Shift should not return  
**Actual:** Deleted shift reappears

**Severity:** High  
**Type:** State Persistence  




---

### 🐞 7. Completed Shift Moves Back to "All Shifts" on Refresh

**Steps:**
1. Mark a shift as completed  
2. Refresh the page

**Expected:** Shift should stay under “Completed”  
**Actual:** Shift returns to “All Shifts”

**Severity:** High  
**Type:** Backend Sync Bug


---

### 🐞 8. Completed Shift Lost After Logout/Login

**Steps:**
1. Mark a shift as completed  
2. Logout → Login

**Expected:** Shift still marked as completed  
**Actual:** Completed state lost, back in “All Shifts”

**Severity:** High  
**Type:** Session Persistence Bug


---

### 🪲 9. No Empty State Message in "Active Shifts"

📝 _Note: This is not a critical bug. It is a UX suggestion for better field-specific feedback._

**Steps:**
1. Complete all shifts  
2. Go to “Active Shifts”

**Expected:** Message like “No active shifts found”  
**Actual:** Blank screen

**Severity:** Low  
**Type:** UX Bug



---
### 🐞 10. Session Persists Without “Remember Me” Checked

📝 Note: This is not a critical bug. It is a UX-level observation related to session behavior.

**Steps:**
	1.	Go to the Login page
	2.	Enter valid credentials
	•	Email: john@example.com
	•	Password: StrongPass123!
	3.	Do not check the “Remember Me” checkbox
	4.	Click Login
	5.	Close or refresh the browser tab
	6.	Reopen the app or revisit the login page

**Expected:**
User should be logged out automatically when browser is closed or refreshed without “Remember Me” checked.

**Actual:**
User remains logged in even though “Remember Me” was not selected.

**Severity:** Low
**Type:** UX Observation / Session Persistence

### 🐞 11. No Validation Error for Excessively Long Full Name

### Steps to Reproduce:
	1.	Go to the Registration page
	2.	Enter a name with 300+ characters (e.g., "A".repeat(300))
	3.	Fill in valid email and password fields
	4.	Click the Register button

### Expected:
Should show a validation error like:
	•	“Full name too long”
	•	or “Full name must be under 100 characters”
And prevent form submission.

### Actual:
Form submits successfully, and the user is redirected to the Shift Dashboard.
The long name is accepted, saved, and displayed in the system — without any validation.

### Severity: Medium
### Type: Frontend + Backend Validation Bug

📸 Screenshot:
See registration-long-name-no-validation-error.png in the /screenshots/ folder.

Status:
Bug detected by Cypress test case TC9 in registration.cy.js.

### 🐞 12. Invalid Email Format Not Validated in Forgot Password

### Steps to Reproduce:
	1.	On Login page, click “Forgot Password?”
	2.	Enter:
	•	Email: invalidemail (no @ or .com)
	3.	Click Submit

### Expected:

	•	“Please enter a valid email address” (frontend validation)

### Actual:
Shows:
	•	“User not found” — even though the format itself is invalid

### Severity: Medium
### type: Frontend Validation + UX Misleading Error

📸 Screenshot:
See forgot-invalid-email-format.png under /screenshots/ folder.

