import { validatePassword } from '../../helpers/validatePassword.tsx';

describe('validatePassword', () => {
    test('returns an error if password is less than 8 characters', () => {
        const result = validatePassword('Ab1');
        expect(result).toContain('Hasło musi zawierać conajmniej 8 znaków');
    });

    test('returns an error if password does not contain a lowercase letter', () => {
        const result = validatePassword('ABCDEFG1');
        expect(result).toContain('Hasło musi zawierać małą literę');
    });

    test('returns an error if password does not contain an uppercase letter', () => {
        const result = validatePassword('abcdefg1');
        expect(result).toContain('Hasło musi zawierać dużą literę');
    });

    test('returns an error if password does not contain a number', () => {
        const result = validatePassword('Abcdefgh');
        expect(result).toContain('Hasło musi zawierać liczbę');
    });

    test('returns multiple errors for a password missing multiple criteria', () => {
        const result = validatePassword('abc');
        expect(result).toContain('Hasło musi zawierać conajmniej 8 znaków');
        expect(result).toContain('Hasło musi zawierać dużą literę');
        expect(result).toContain('Hasło musi zawierać liczbę');
    });

    test('returns an empty array for a valid password', () => {
        const result = validatePassword('ValidPass123');
        expect(result).toEqual([]);
    });
});
