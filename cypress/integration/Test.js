describe('End to End testing', () => { // Test suite for end-to-end flow
  it('should launch the application URL and submit order', () => { // Test case for launching URL and submitting order
    const products = 'Nokia Edge'; // Product to be selected
    let sum = 0; // Variable to store total amount
    let finalAmount = 0; // Variable to store final amount

    cy.visit('https://rahulshettyacademy.com/loginpagePractise/#'); // Visit the login page
    cy.get('#username').type('rahulshettyacademy'); // Enter username
    cy.get('#password').type('learning'); // Enter password

    cy.get('#signInBtn').click(); // Click the sign in button
    cy.url().should('include', 'shop'); // Verify URL contains 'shop'
    cy.contains("Shop Name").should('be.visible'); // Check that 'Shop Name' is visible
    cy.get('app-card').should('have.length', 4); // Assert there are 4 product cards
    cy.get('app-card').filter(`:contains("${products}")`) // Filter cards for the product
      .then(card => {
        cy.wrap(card).should('have.length', 1); // Ensure only one card matches
        cy.wrap(card).find('button').click(); // Click the button to add product to cart

      })

    cy.get('app-card').eq(0).find('button').click(); // Add the first product card to cart
    cy.contains('Checkout').click(); // Click the 'Checkout' button

    cy.get('tr td:nth-child(4) strong')
      .each($el => {
        const amount = Number($el.text().split(" ")[1].trim()) // Extract and convert price to number
        sum += amount; // Add price to total sum


      }).then(() => {

        expect(sum).to.be.lessThan(280000) // Assert total sum is less than 280000

      });
    cy.get('tr td:nth-child(5) strong').then($el => {
      finalAmount = Number($el.text().split(" ")[1].trim())

      expect(finalAmount).to.equal(sum)


    });

    //----------------------------------------------------------
    cy.get('button.btn-success').click();
    cy.get('#country').type('India');
    cy.get('div.suggestions li a', { timeout: 10000 }).should('be.visible').click();

    cy.get('input.btn-success').click();
    cy.get('.alert').should('include.text', 'Success');



  });
});