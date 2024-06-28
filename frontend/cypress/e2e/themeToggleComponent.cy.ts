describe('ThemeToggleComponent', () => {
    it('should toggle dark mode', () => {
      cy.visit('/');
      cy.get('button.toggle-dark-mode').click();
      cy.get('body').should('have.class', 'dark-mode');
      cy.get('button.toggle-dark-mode').click();
      cy.get('body').should('not.have.class', 'dark-mode');
    });
  
    it('should toggle color palette visibility', () => {
      cy.visit('/');
      cy.get('button.toggle-color-palette').click();
      cy.get('.color-palette').should('be.visible');
      cy.get('button.toggle-color-palette').click();
      cy.get('.color-palette').should('not.be.visible');
    });
  
    it('should set color theme', () => {
      cy.visit('/');
      cy.get('button.toggle-color-palette').click();
      cy.get('.color-palette button.color-option').first().click();
      cy.get('html').should('have.attr', 'style').and('include', '--primary-color');
    });
  });  