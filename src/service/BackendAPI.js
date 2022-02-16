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

    getAllSongs() {
        return fetch(process.env.REACT_APP_BACKEND_URL + "songs/")
    }

    getSongsByUserId(userId) {
        return fetch(process.env.REACT_APP_BACKEND_URL + `users/${userId}/songs/`)
    }

    saveSong(data) {
        return fetch(process.env.REACT_APP_BACKEND_URL + "songs/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + AuthorizationLogic.getAccessToken()
            },
            body: data
        })
    }
}

export default new BackendAPI();
