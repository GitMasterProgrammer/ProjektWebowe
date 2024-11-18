describe('Osoby', () => {
    it('Wyswietlania', () => {
        Cypress.session.clearAllSavedSessions()
        cy.visit('/targets')
        cy.loginViaUi({email: 'konto@wp.pl', password: '!Admin1234'})
        cy.get('span.nav-link').contains(`konto@wp.pl`)
        cy.getCookie('_auth').should('exist')
        cy.visit('/targets')
        cy.contains('Cebula')
    })

    it('Followanie', ()=>{
        cy.visit('/targets')

        cy.get('button.btn').contains('Follow').click()
        cy.get('button.btn').contains('Unfollow')
    })

    it('Unfollowanie', ()=>{
        cy.visit('/targets')

        cy.get('button.btn').contains('Unfollow').click()
        cy.get('button.btn').contains('Follow')
    })

    it('Details', ()=>{
        cy.visit('/targets')
        cy.visit('/targets/1')
        cy.get('h2').contains('Cebula')
        cy.get('a.btn').contains('Wróć').click()
        cy.url().should('include', '/targets')
    })

})