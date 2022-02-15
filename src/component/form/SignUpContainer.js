import React from "react";
import "../../style/SongPlayer.css"
import FormValidator from "../../service/FormValidator";
import BackendAPI from "../../service/BackendAPI";

class SignUpContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            errorList: [],
            formValidator: true
        };
    }

    handleChangeInputField = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmitSignupForm = (event) => {
        event.preventDefault();
        const {username, email, password, confirmPassword} = this.state;
        if (FormValidator.isValidSignUpForm(username, email, password, confirmPassword)) {
            const user = {
                username: username,
                email: email,
                password: password
            };
            BackendAPI.signup(user)
                .then(response => {
                    this.setState({isSuccessSignUp: response.ok});
                    return response.json();
                })
                .then(json => {
                    if (!this.state.isSuccessSignUp) {
                        const errors = []
                        for (let key in json) {
                            errors.push(json[key])
                        }
                        this.setState({errorList: errors});
                    }
                })
        } else {
            this.setState({formValidator: false})
        }
    }

    render() {
        const {username, password, email, confirmPassword, formValidator, isSuccessSignUp, errorList} = this.state;
        const errorMessage = errorList.map((error) => <p>{error}</p>);
        if (isSuccessSignUp) {
            return (
                <div className="auth-form">
                    <h1>Successful sign up</h1>
                    <p>Click <a href="/signin">here</a> to sign in to your account.</p>
                </div>
            )
        } else {
            return (
                <div className="auth-form">
                    <form onSubmit={this.handleSubmitSignupForm}>
                        <h1>Sign up</h1>

                        <div className="input-element">
                            <label htmlFor="username"><b>Username</b></label>
                            <input type="text" placeholder="Enter username" name="username"
                                   onChange={this.handleChangeInputField}/>
                            <p className="error-data"
                               hidden={FormValidator.isValidUsername(username) || formValidator}>
                                Username field length must be from 1 to 30 characters without space
                            </p>
                        </div>

                        <div className="input-element">
                            <label htmlFor="email"><b>Email</b></label>
                            <input type="text" placeholder="Enter email" name="email"
                                   onChange={this.handleChangeInputField}/>
                            <p className="error-data"
                               hidden={FormValidator.isValidEmail(email) || formValidator}>
                                Incorrect email
                            </p>
                        </div>

                        <div className="input-element">
                            <label htmlFor="password"><b>Password</b></label>
                            <input type="password" placeholder="Enter password" name="password"
                                   onChange={this.handleChangeInputField}/>
                            <p className="error-data"
                               hidden={FormValidator.isValidPassword(password) || formValidator}>
                                Password must be 8 characters including 1 numeric character and 1 alphabetical character
                            </p>
                        </div>

                        <div className="input-element">
                            <label htmlFor="confirmPassword"><b>Confirm Password</b></label>
                            <input type="password" placeholder="Confirm password" name="confirmPassword"
                                   onChange={this.handleChangeInputField}/>
                            <p className="error-data"
                               hidden={FormValidator.isValidConfirmPassword(password, confirmPassword) || formValidator}>
                                Password mismatch
                            </p>
                        </div>

                        <div className="error-massage">{errorMessage}</div>

                        <button type="submit" className="submit">Sign up</button>
                        <button type="button" className="cancel"
                                onClick={() => window.location.assign("/")}>
                            Cancel
                        </button>
                    </form>
                </div>
            )
        }
    }
}

export default SignUpContainer;
