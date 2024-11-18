describe('rejestracja', () => {
  it('poprawne', () =>  {
    Cypress.session.clearAllSavedSessions()
    cy.visit('/')
    cy.registerViaUi({email: 'konto999@wp.pl', name: 'nazwa' ,password1: '!Admin1234', password2: '!Admin1234'})
    cy.getCookie('_auth').should('exist')
    cy.get('li').should('contain','nazwa')
  })

  it('uzywane email', () =>  {
    Cypress.session.clearAllSavedSessions()
    cy.visit('/')
    cy.registerViaUi({email: 'konto999@wp.pl', name: 'nazwa' ,password1: '!Admin1234', password2: '!Admin1234'})
    cy.contains('Email already in use')
  })

  it('rozna hasla', () =>  {
    Cypress.session.clearAllSavedSessions()
    cy.visit('/')
    cy.registerViaUi({email: 'konto999@wp.pl', name: 'nazwa' ,password1: '!Admin12', password2: '!Admin1234'})
    cy.contains('Hasła muszą być takie same')
  })

  it('zly email', () =>  {
    Cypress.session.clearAllSavedSessions()
    cy.visit('/')
    cy.registerViaUi({email: 'konto999', name: 'nazwa' ,password1: '!Admin1234', password2: '!Admin1234'})
    cy.contains('Email nie jest poprawny')
  })
})