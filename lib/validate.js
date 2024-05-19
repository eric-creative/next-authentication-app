

export function validateUserInput({username, email, password, verifyPassword}) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username || typeof username !== 'string' || username.trim().length === 0) {
        return 'Invalid username. Please provide a valid username.';
    }

    if (!email || !emailRegex.test(email)) {
        return 'Invalid email. Please provide a valid email address.';
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
        return 'Invalid password. Password must be at least 6 characters long.';
    }

    if (password !== verifyPassword) {
        return 'Passwords do not match. Please verify your password.';
    }

    return 'valid';
}
