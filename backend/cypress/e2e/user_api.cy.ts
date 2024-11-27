
describe('User API Tests', () => {
    const apiUrl = 'http://localhost:3000/api/user';

    let userId: number;

    before(() => {
    });

    it('should create a new user', () => {
        const newUser = {
            email: 'testuser@example.com',
            password: 'password123',
            name: 'Test User'
        };

        cy.request('POST', `${apiUrl}/post`, newUser)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.status).to.eq('success');
                userId = response.body.data.id;
            });
    });

    it('should get a user by ID', () => {
        cy.request('GET', `${apiUrl}/get/${userId}`)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.user).to.have.property('id', userId);
            });
    });

    it('should get all users with optional query parameters', () => {
        cy.request('GET', `${apiUrl}/get?maxRows=10&orderBy=id_desc`)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.record).to.be.an('array');
            });
    });

    it('should update a user by ID', () => {
        const updatedData = { name: 'Updated Test User' };

        cy.request('PUT', `${apiUrl}/put/${userId}`, updatedData)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.record).to.have.property('name', updatedData.name);
            });
    });

    it('should get liked targets for a user by ID', () => {
        cy.request('GET', `${apiUrl}/get/likedTargets/${userId}`)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.record).to.exist;
            });
    });

    it('should delete a user by ID', () => {
        cy.request('DELETE', `${apiUrl}/delete?id=${userId}`)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.record).to.exist;
            });
    });

    after(() => {
    });
});
