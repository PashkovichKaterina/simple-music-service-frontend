import AuthorizationLogic from "./AuthorizationLogic"

class BackendAPI {
    signin(user) {
        return fetch(process.env.REACT_APP_BACKEND_URL + "token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
    }

    signup(user) {
        return fetch(process.env.REACT_APP_BACKEND_URL + "signup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
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
        return this.checkToken()
            .then(() => {
                return fetch(process.env.REACT_APP_BACKEND_URL + "songs/", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + AuthorizationLogic.getAccessToken()
                    },
                    body: data
                })
            })
    }

    savePlaylist(playlist) {
        return this.checkToken()
            .then(() => {
                return fetch(process.env.REACT_APP_BACKEND_URL + `users/${AuthorizationLogic.getUserId()}/playlists/`, {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + AuthorizationLogic.getAccessToken(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(playlist)
                })
            })
    }

    refreshToken() {
        return fetch(process.env.REACT_APP_BACKEND_URL + "token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"refresh": AuthorizationLogic.getRefreshToken()})
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(json => {
                if (json) {
                    AuthorizationLogic.setAccessToken(json.access)
                    AuthorizationLogic.setRefreshToken(json.refresh)
                }
            })
    }

    checkToken() {
        let promise
        if (!AuthorizationLogic.isValidAccessToken()) {
            promise = this.refreshToken()
        } else {
            promise = new Promise((resolve) => {
                resolve()
            })
        }
        return promise
    }
}

export default new BackendAPI()
