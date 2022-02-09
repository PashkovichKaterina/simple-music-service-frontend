class AuthenticationService {
    signin(user) {
        return fetch("http://backend-service.us-west-2.elasticbeanstalk.com/token/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
    }

    signup(user) {
        return fetch("http://backend-service.us-west-2.elasticbeanstalk.com/signup/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
    }
}

export default new AuthenticationService();