describe('Location API Tests', () => {
    const apiUrl = 'http://localhost:3000/api/location';

    let locationId: number;

    before(() => {
    });

    it('should create a new location', () => {
        const newLocation = {
            details: 'A description for the test location',
            targetId: 1,
            creatorId: 2,
            address: 'Fredry, 13'
        };

        cy.request('POST', `${apiUrl}/post`, newLocation)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.status).to.eq('success');
                locationId = response.body.data.id;
            });
    });

    it('should get a location by ID', () => {
        cy.request('GET', `${apiUrl}/get/${locationId}`)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.record).to.have.property('id', locationId);
            });
    });

    it('should get all locations with optional query parameters', () => {
        cy.request('GET', `${apiUrl}/get?maxRows=10&orderBy=id_desc`)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.record).to.be.an('array');
            });
    });

    it('should delete a location by ID', () => {
        cy.request('DELETE', `${apiUrl}/delete?id=${locationId}`)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.record).to.exist;
            });
    });

    after(() => {
    });
});
