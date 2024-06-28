describe('NoteDetailComponent', () => {
    beforeEach(() => {
      cy.intercept('GET', '/notes/1', { fixture: 'note.json' }).as('getNoteById');
    });
  
    it('should fetch the note by ID and display it', () => {
      cy.visit('/notes/1');
      cy.wait('@getNoteById');
      cy.get('.note-title').should('contain', 'Test Note');
    });
  
    it('should navigate back to the list', () => {
      cy.visit('/notes/1');
      cy.get('button.back-to-list').click();
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });  