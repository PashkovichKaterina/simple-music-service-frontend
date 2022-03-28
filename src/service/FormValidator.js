class FormValidator {
    isValidSignUpForm(username, email, password, confirmPassword) {
        return this.isValidUsername(username) && this.isValidEmail(email) && this.isValidPassword(password)
            && this.isValidConfirmPassword(password, confirmPassword);
    }

    isValidSignInForm(username, password) {
        return username && password
            && username.length > 0 && password.length > 0
    }

    isValidUsername(username) {
        return username && username.match(/^\w{1,50}$/)
    }

    isValidPassword(password) {
        return password && password.match(/(?=.*[0-9])(?=.*[A-z])[0-9A-z]{8,}/)
    }

    isValidConfirmPassword(password, confirmPassword) {
        return password === confirmPassword
    }

    isValidEmail(email) {
        return email && email.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/) != null
            && email.length < 250
    }

    isValidUploadSongForm(title, artist, date, song) {
        return this.isValidTitle(title) && this.isValidArtist(artist)
            && this.isValidDate(date) && this.isValidSong(song)
    }

    isValidTitle(title) {
        return title && title.match(/[\w ]{1,50}$/)
    }

    isValidArtist(artist) {
        return artist && artist.length > 0
    }

    isValidDate(date) {
        return date && date.match(/(\d\d\d\d)-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/)
    }

    isValidSong(song) {
        return song && song.files && song.files.length > 0
            && song.files[0].size < process.env.REACT_APP_FILE_UPLOAD_MAX_MEMORY_SIZE
            && song.files[0].name.split('.').pop() === "mp3"
    }

    isValidCommentMessage(message) {
        const regex = /.{1,100}$/
        return message && message.match(regex) && message.match(regex)[0] === message
    }
}

export default new FormValidator()
