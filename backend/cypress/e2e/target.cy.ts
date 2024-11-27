describe('Target API Tests', () => {
    const apiUrl = 'http://localhost:3000/api/target';

    let targetId: number;

    before(() => {
    });

    it('should create a new target', () => {
        const newTarget = {
            name: 'Test Target',
            description: 'A description for the test target',
            creatorId: 2
        };

        cy.request('POST', `${apiUrl}/post`, newTarget)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.status).to.eq('success');
                targetId = response.body.data.id;
            });
    });

    it('should get a target by ID', () => {
        cy.request('GET', `${apiUrl}/get/${targetId}`)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.target).to.have.property('id', targetId);
                expect(response.body.target).to.have.property('countLikedUsers');
            });
    });

    it('should get all targets with optional query parameters', () => {
        cy.request('GET', `${apiUrl}/get?maxRows=10&orderBy=likes_desc`)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.recordsLike).to.be.an('array');
            });
    });

    it('should update a target by ID', () => {
        const updatedData = { description: 'Updated description for test target' };

        cy.request('PUT', `${apiUrl}/put/${targetId}`, updatedData)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.record).to.have.property('description', updatedData.description);
            });
    });

    it('should delete a target by ID', () => {
        cy.request('DELETE', `${apiUrl}/delete?id=${targetId}`)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.record).to.exist;
            });
    });

    after(() => {
    });
});
