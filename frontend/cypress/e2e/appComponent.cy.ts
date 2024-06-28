describe('AppComponent', () => {
    it('should create the app component and render child components', () => {
      cy.visit('/');
      cy.get('app-sidebar').should('exist');
      cy.get('app-notification').should('exist');
      cy.get('app-navbar').should('exist');
      cy.get('app-theme-toggle').should('exist');
    });
  
    it('should have a title "frontend"', () => {
      cy.visit('/');
      cy.get('h1').should('contain', 'frontend');
    });
  });  