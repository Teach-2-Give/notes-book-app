describe('NoteService', () => {
    beforeEach(() => {
      cy.intercept('GET', '/notes', { fixture: 'notes.json' }).as('getNotes');
      cy.intercept('GET', '/notes/1', { fixture: 'note.json' }).as('getNoteById');
      cy.intercept('POST', '/notes', {}).as('createNote');
      cy.intercept('PUT', '/notes/1', {}).as('updateNote');
      cy.intercept('DELETE', '/notes/1', {}).as('deleteNote');
    });
  
    it('should fetch all notes', () => {
      cy.visit('/');
      cy.wait('@getNotes');
      cy.get('.note').should('have.length', 2);
    });
  
    it('should fetch a note by ID', () => {
      cy.visit('/notes/1');
      cy.wait('@getNoteById');
      cy.get('.note-title').should('contain', 'Test Note');
    });
  
    it('should create a new note', () => {
      cy.visit('/notes/create');
      cy.get('input[name="title"]').type('New Note');
      cy.get('textarea[name="content"]').type('New Content');
      cy.get('button[type="submit"]').click();
      cy.wait('@createNote');
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  
    it('should update a note by ID', () => {
      cy.visit('/notes/1/edit');
      cy.get('input[name="title"]').clear().type('Updated Note');
      cy.get('textarea[name="content"]').clear().type('Updated Content');
      cy.get('button[type="submit"]').click();
      cy.wait('@updateNote');
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  
    it('should delete a note by ID', () => {
      cy.visit('/');
      cy.get('button.delete-note').first().click();
      cy.wait('@deleteNote');
      cy.get('.note').should('have.length', 1);
    });
  });  