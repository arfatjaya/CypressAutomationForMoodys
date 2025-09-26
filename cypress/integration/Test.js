describe('End to End testing', () => {
  it('should launch the application URL and submit order', () => {
    const products = 'Nokia Edge';
    let sum=0;

    cy.visit('https://rahulshettyacademy.com/loginpagePractise/#');
    cy.get('#username').type('rahulshettyacademy');
    cy.get('#password').type('learning');

    cy.get('#signInBtn').click();
    cy.url().should('include', 'shop');
    cy.contains("Shop Name").should('be.visible');
    cy.get('app-card').should('have.length', 4);
    cy.get('app-card').filter(`:contains("${products}")`)
    .then(card => {
        cy.wrap(card).should('have.length', 1);
        cy.wrap(card).find('button').click();
  
      })
      
      cy.get('app-card').eq(0).find('button').click();
      cy.contains('Checkout').click();

      cy.get('tr td:nth-child(4) strong').each($el=>{


        const amount = Number($el.text().split(" ")[1].trim())
        sum+=amount;
      }).then(()=>{
        expect(sum).to.be.lessThan(280000)

      })

      ;
    });
  });