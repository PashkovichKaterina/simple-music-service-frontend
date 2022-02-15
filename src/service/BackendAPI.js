import AuthorizationLogic from "./AuthorizationLogic";

class BackendAPI {
    signin(user) {
        return fetch(process.env.REACT_APP_BACKEND_URL + "token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });
    }

    signup(user) {
        return fetch(process.env.REACT_APP_BACKEND_URL + "signup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });
    }

    getAllArtist() {
        return fetch(process.env.REACT_APP_BACKEND_URL + "artists/")
    }

    saveSong(data) {
        return fetch(process.env.REACT_APP_BACKEND_URL + "songs/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + AuthorizationLogic.getAccessToken(),
                "Content-Type": "multipart/form-data; boundary=Random",
            },
            body: data
        })
    }
}

export default new BackendAPI();
