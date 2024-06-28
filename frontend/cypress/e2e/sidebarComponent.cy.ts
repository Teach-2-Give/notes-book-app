describe('SidebarComponent', () => {
    it('should render all FontAwesome icons', () => {
      cy.visit('/');
      cy.get('fa-icon[icon="faStickyNote"]').should('exist');
      cy.get('fa-icon[icon="faUser"]').should('exist');
      cy.get('fa-icon[icon="faTrash"]').should('exist');
      cy.get('fa-icon[icon="faSignOutAlt"]').should('exist');
      cy.get('fa-icon[icon="faQuestionCircle"]').should('exist');
      cy.get('fa-icon[icon="faCog"]').should('exist');
    });
  });  