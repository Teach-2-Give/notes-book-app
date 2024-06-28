describe('NoteEditComponent', () => {
    beforeEach(() => {
      cy.intercept('GET', '/notes/1', { fixture: 'note.json' }).as('getNoteById');
      cy.intercept('PUT', '/notes/1', {}).as('updateNote');
      cy.intercept('POST', '/notes', {}).as('createNote');
    });
  
    it('should initialize the form in edit mode with existing note data', () => {
      cy.visit('/notes/1/edit');
      cy.wait('@getNoteById');
      cy.get('input[name="title"]').should('have.value', 'Test Note');
      cy.get('textarea[name="content"]').should('have.value', 'Test Content');
    });
  
    it('should call updateNoteById on form submit in edit mode', () => {
      cy.visit('/notes/1/edit');
      cy.get('input[name="title"]').clear().type('Updated Note');
      cy.get('textarea[name="content"]').clear().type('Updated Content');
      cy.get('button[type="submit"]').click();
      cy.wait('@updateNote');
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  
    it('should call createNote on form submit in create mode', () => {
      cy.visit('/notes/create');
      cy.get('input[name="title"]').type('New Note');
      cy.get('textarea[name="content"]').type('New Content');
      cy.get('button[type="submit"]').click();
      cy.wait('@createNote');
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  
    it('should navigate back to the list', () => {
      cy.visit('/notes/create');
      cy.get('button.back-to-list').click();
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });  