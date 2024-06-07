import validateEmail from '../../../helpers/validateEmail.tsx';

describe('validateEmail', () => {
    test('returns non-null for a valid email address', () => {
        const validEmails = [
            'test@example.com',
            'user.name+tag+sorting@example.com',
            'user.name@example.co.uk',
            'user.name@sub.domain.com',
            'user@example.museum',
            'user@example.name',
            'user@example.jobs'
        ];

        validEmails.forEach(email => {
            expect(validateEmail(email)).not.toBeNull();
        });
    });

    test('handles edge cases', () => {
        const edgeCases = [
            'user@localhost',
            'user@localserver',
            'user@192.168.0.1'
        ];

        edgeCases.forEach(email => {
            expect(validateEmail(email)).toBeNull();
        });
    });
});
