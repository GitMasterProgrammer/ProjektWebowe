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

    it('Zglaszanie', ()=>{
        cy.visit('/targets')
        cy.get('button.btn').contains('Follow').click()
        cy.visit('/report')

        cy.get('select').select(1);

        cy.get('input[name=address]').type('Fredry, 13')
        cy.get('textarea[name=details]').type('Znaleziono')
        cy.get('button.btn-primary').click()

        cy.url().should('include', '/reports')
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

    it('Liked', ()=>{
        let val1;
        let val2;
        Cypress.session.clearAllSavedSessions()
        cy.visit('/targets')
        cy.loginViaUi({email: 'konto@wp.pl', password: '!Admin1234'})
        cy.visit('/targets')

        cy.get('button.btn').contains('Follow').click()

        cy.get('.icon > div')
            .first()// Select the inner <div> inside the .icon class
            .invoke('text') // Get the text content
            .then((text) => {
                 val1 = parseInt(text.trim()); // Remove any leading/trailing spaces
                // Log the value to the Cypress console
            });


        cy.get('.card-body .hover-link').first().click()



        cy.get('.icon > div') // Adjust the selector to match the second <div>
            .invoke('text')
            .then((text) => {
                 val2 = parseInt(text.trim()); // Parse the text into a float
            });

        cy.then(() => {
            expect(val1 + 1).to.equal(val2); // Ensure the values are equal
        });
    })


    it('Create', ()=> {
        Cypress.session.clearAllSavedSessions()
        cy.visit('/createTarget')
        cy.loginViaUi({email: 'konto@wp.pl', password: '!Admin1234'})
        cy.get('input[name=name]').type("Mariusz")
        cy.get('textarea[name=description]').type("Jest zlym czlowiekiem")
        cy.get('button.btn-primary').click()
        cy.get('.name-location').last().then((lastElement) => {
            cy.wrap(lastElement).should('contain.text', 'Mariusz');
        });

    })
})