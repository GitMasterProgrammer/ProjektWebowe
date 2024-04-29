export const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) {
        errors.push("Hasło musi zawierać conajmniej 8 znaków")
    }
    if (password.search(/[a-z]/) < 0) {
        errors.push("Hasło musi zawierać małą literę")
    }
    if (password.search(/[A-Z]/) < 0) {
        errors.push("Hasło musi zawierać dużą literę")
    }
    // if (password.search(/[!@#$%^&*()-=_+]/) < 0) {
    //     alert("Your password needs an uppser case letter")
    // }
    if (password.search(/[0-9]/) < 0) {
        errors.push("Hasło musi zawierać liczbę")
    }
    return errors
}