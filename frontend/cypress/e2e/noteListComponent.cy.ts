describe('NoteListComponent', () => {
    beforeEach(() => {
      cy.intercept('GET', '/notes', { fixture: 'notes.json' }).as('getNotes');
      cy.intercept('DELETE', '/notes/1', {}).as('deleteNote');
    });
  
    it('should fetch and display notes', () => {
      cy.visit('/');
      cy.wait('@getNotes');
      cy.get('.note').should('have.length', 2);
    });
  
    it('should confirm note deletion', () => {
      cy.visit('/');
      cy.get('button.delete-note').first().click();
      cy.get('.confirmation-dialog').should('be.visible');
    });
  
    it('should cancel note deletion', () => {
      cy.visit('/');
      cy.get('button.delete-note').first().click();
      cy.get('button.cancel-delete').click();
      cy.get('.confirmation-dialog').should('not.exist');
    });
  
    it('should delete note and refresh the list', () => {
      cy.visit('/');
      cy.get('button.delete-note').first().click();
      cy.get('button.confirm-delete').click();
      cy.wait('@deleteNote');
      cy.wait('@getNotes');
      cy.get('.note').should('have.length', 1);
    });
  
    it('should handle error while deleting note', () => {
      cy.intercept('DELETE', '/notes/1', {
        statusCode: 500,
        body: 'Error deleting note'
      }).as('deleteNoteError');
      cy.visit('/');
      cy.get('button.delete-note').first().click();
      cy.get('button.confirm-delete').click();
      cy.wait('@deleteNoteError');
      cy.get('.error-message').should('contain', 'Error deleting note');
    });
  });  