import React from "react";
import "../../style/SignForm.css"
import FormValidator from "../../service/FormValidator";
import BackendAPI from "../../service/BackendAPI";
import AuthorizationLogic from "../../service/AuthorizationLogic";

class SignInContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorList: [],
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
        const {username, password} = this.state;
        if (FormValidator.isValidSignInForm(username, password)) {
            const user = {
                username: username,
                password: password
            };
            BackendAPI.signin(user)
                .then(response => {
                    this.setState({isSuccessSignIn: response.ok});
                    return response.json();
                })
                .then(json => {
                    if (this.state.isSuccessSignIn) {
                        AuthorizationLogic.setAccessToken(json.access)
                        AuthorizationLogic.setRefreshToken(json.refresh)
                        window.location.assign("/")
                    } else {
                        const errors = []
                        for (let key in json) {
                            errors.push(json[key])
                        }
                        this.setState({errorList: errors});
                    }
                })
        }
    }

    render() {
        const {errorList} = this.state;
        const errorMessage = errorList.map((error) => <p>{error}</p>);
        return (
            <div className="auth-form">
                <form onSubmit={this.handleSubmitSignupForm}>
                    <h1>Sign in</h1>

                    <div className="input-element">
                        <label htmlFor="username"><b>Username</b></label>
                        <input type="text" placeholder="Enter username" name="username"
                               onChange={this.handleChangeInputField}/>
                    </div>

                    <div className="input-element">
                        <label htmlFor="password"><b>Password</b></label>
                        <input type="password" placeholder="Enter password" name="password"
                               onChange={this.handleChangeInputField}/>
                    </div>

                    <div className="error-message">{errorMessage}</div>

                    <button type="submit" className="submit">Sign in</button>
                    <button type="button" className="cancel"
                            onClick={() => window.location.assign("/")}>
                        Cancel
                    </button>
                </form>
            </div>
        )
    }
}

export default SignInContainer;
