describe('Logowanie', () => {
  it('logowanie poprawne', () => {
    Cypress.session.clearAllSavedSessions()
    cy.visit('/')
    cy.loginViaUi({email: 'konto@wp.pl', password: '!Admin1234'})
    cy.visit('/profile')
    cy.get('span.nav-link').contains(`konto@wp.pl`)
    cy.getCookie('_auth').should('exist')
  })

  it('zle haslo', () => {
    cy.visit('/')
    cy.loginViaUi({email: 'konto@wp.pl', password: '!Admin123'})
    cy.contains('Błędne hasło')
  })

  it('zle konto', () => {
    cy.visit('/')
    cy.loginViaUi({email: 'kont@wp.pl', password: '!Admin1234'})
    cy.contains('Nie znaleziono użytkownika')
  })
  
})