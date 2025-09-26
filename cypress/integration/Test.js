describe('End to End testing', () => {
  it('should launch the application URL and submit order', () => {
    cy.visit('https://rahulshettyacademy.com/loginpagePractise/#');
    cy.get('#username').type('rahulshettyacademy');
    cy.get('#password').type('learning');
   
    cy.get('#signInBtn').click();
    cy.url().should('include', 'shop');
    cy.contains("Shop Name").should('be.visible');



  });
});