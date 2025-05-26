describe("Tests d'authentification du site saucedemo", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });
  it('Connexion réussie avec des identifiants valides (standard_user)', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.url().should('include', '/inventory.html');
    cy.contains('Products').should('be.visible');
  });
  it("Connexion avec le champ Username invalide",()=> {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret");
    cy.get('#login-button').click();
    cy.get('[data-test="error"]').should("contain","Username and password do not match any user in this service")
})
it("Connexion avec le champ Password invalide",()=> {
  cy.get('[data-test="username"]').type("user");
  cy.get('[data-test="password"]').type("secret_sauce");
  cy.get('#login-button').click();
  cy.get('[data-test="error"]').should("contain","Username and password do not match any user in this service")
})
  it('Connexion avec identifiants invalides', () => {
    cy.get('[data-test="username"]').type('user');
    cy.get('[data-test="password"]').type('fake_password');
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]').should('contain', 'Username and password do not match');
  });

  it('Connexion avec champ mot de passe vide', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]').should('contain', 'Password is required');
  });

  it('Connexion avec champ Username vide', () => {
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]').should('contain', 'Username is required');
  });

  it('Échec de connexion avec les deux champs vides', () => {
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]').should('contain', 'Username is required');
  });

});
