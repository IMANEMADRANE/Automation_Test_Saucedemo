import { faker } from '@faker-js/faker';

const randomFname=faker.person.firstName()
const randomLName = faker.person.lastName()
const randomZip = faker.location.zipCode();

describe("Parcours : De la connexion à la déconnexion ", () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
      cy.url().should('include', '/inventory.html');
    });

    it('Acheter 3 produits aléatoires', () => {
        cy.get('.inventory_item').then((items) => {
        const randomItems = Cypress._.sampleSize(items.toArray(), 3);
        randomItems.forEach((item) => {
        cy.wrap(item).contains('Add to cart').click();
        });
    });
      cy.get('.shopping_cart_badge').should('have.text', '3');
      cy.get('[data-test="shopping-cart-link"]').click();
      cy.get(".cart_item").should("have.length",3)
      cy.get('[data-test="checkout"]').click();
      cy.get('[data-test="firstName"]').type(randomFname)
      cy.get('[data-test="lastName"]').type(randomLName )
      cy.get('[data-test="postalCode"]').type(randomZip);
      cy.get('[data-test="continue"]').click();
      cy.get('[data-test="finish"]').click();
      cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
      cy.get('[data-test="back-to-products"]').click();
      cy.get('#react-burger-menu-btn').click();
      cy.get('[data-test="logout-sidebar-link"]').click();
    });
  });
  