# QUnit Tests for Test App
This project includes integration tests using the QUnit framework to validate various functionalities of the Test App. These tests interact directly with the application's API to perform user registration, login, and CRUD operations. The tests do not involve frontend interactions, ensuring that the core backend functionalities are working as expected.

## Prerequisits & Setup
- Setup the test app locally https://github.com/alpeykov/test-app/blob/master/README.md
- Visit http://localhost:3000/
- git clone https://github.com/alpeykov/qunit-tests-test-app.git
- Navigate to test.html and open it in your browser

**Test Details**
User Functionalities (#1 USER FUNCTIONALITIES):
- Test 1.1: Registers a new random user.
- Test 1.2: Logs in with the newly created user.

CRUD Functionalities (#2 ITEM FUNCTIONALITIES):

- Test 2.1: Retrieves all available items.
- Test 2.2: Creates a new item.
- Test 2.3: Edits an existing item.
- Test 2.4: Deletes an item.
