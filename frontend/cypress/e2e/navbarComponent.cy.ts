describe('NavbarComponent', () => {
    it('should render search and add icons', () => {
      cy.visit('/');
      cy.get('fa-icon[icon="faSearch"]').should('exist');
      cy.get('fa-icon[icon="faPlus"]').should('exist');
    });
  });  