class FormValidator {
    isValidSignUpForm(username, email, password, confirmPassword) {
        return this.isValidUsername(username) && this.isValidEmail(email) && this.isValidPassword(password)
            && this.isValidConfirmPassword(password, confirmPassword);
    }

    isValidSignInForm(username, password) {
        return username && password
            && username.length > 0 && password.length > 0;
    }

    isValidUsername(username) {
        return username && username.match(/^\w{1,50}$/);
    }

    isValidPassword(password) {
        return password && password.match(/(?=.*[0-9])(?=.*[A-z])[0-9A-z]{8,}/);
    }

    isValidConfirmPassword(password, confirmPassword) {
        return password === confirmPassword;
    }

    isValidEmail(email) {
        return email && email.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/) != null && email.length < 250;
    }
}

export default new FormValidator();
