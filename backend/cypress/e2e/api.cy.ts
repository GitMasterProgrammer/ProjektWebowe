describe('API Tests', () => {
    const baseUrl = 'http://localhost:3000/api';

    describe('Location on Users', () => {
        it('Get all liked locations', () => {
            cy.request('GET', `${baseUrl}/likedLocations/get`).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.record.length).to.be.gte(1);
            });
        });
    });

    describe('Login', () => {

        it('Login with wrong password', () => {
            cy.request({
                method: 'POST',
                url: `${baseUrl}/login`,
                failOnStatusCode: false,
                body: {
                    email: 'user@example.com',
                    password: 'wrongpassword',
                },
            }).then((response) => {
                expect(response.status).to.eq(400);
            });
        });


    });



    describe('Targets', () => {

        it('Delete target', () => {
            cy.request({
                method: 'DELETE',
                url: `${baseUrl}/target/delete`,
                qs: { id: 999998 },
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });


    describe('User', () => {

        it('Change user name', () => {
            cy.request({
                method: 'PUT',
                url: `${baseUrl}/user/put/2`,
                body: { name: 'John John' },
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });
});
