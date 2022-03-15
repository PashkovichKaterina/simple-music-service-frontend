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

    getAllSongs(search) {
        return fetch(this.getUrlWithSearchParam(process.env.REACT_APP_BACKEND_URL + "songs/", search))
    }

    getSongsByUserId(search) {
        return fetch(
            this.getUrlWithSearchParam(
                process.env.REACT_APP_BACKEND_URL + `users/${AuthorizationLogic.getUserId()}/songs/`,
                search
            )
        )
    }

    saveSong(data) {
        return this.checkToken()
            .then(() => {
                return fetch(process.env.REACT_APP_BACKEND_URL + `users/${AuthorizationLogic.getUserId()}/songs/`, {
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

    getPlaylistByUserId(search) {
        return this.checkToken()
            .then(() => {
                return fetch(
                    this.getUrlWithSearchParam(
                        process.env.REACT_APP_BACKEND_URL + `users/${AuthorizationLogic.getUserId()}/playlists/`,
                        search
                    ), {
                        headers: {
                            "Authorization": "Bearer " + AuthorizationLogic.getAccessToken()
                        }
                    })
            })
    }

    deletePlaylist(playlistId) {
        return this.checkToken()
            .then(() => {
                return fetch(process.env.REACT_APP_BACKEND_URL + `users/${AuthorizationLogic.getUserId()}/playlists/${playlistId}/`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + AuthorizationLogic.getAccessToken()
                    }
                })
            })
    }

    getPlaylistSong(playlistId) {
        return this.checkToken()
            .then(() => {
                return fetch(process.env.REACT_APP_BACKEND_URL + `users/${AuthorizationLogic.getUserId()}/playlists/${playlistId}/`, {
                    headers: {
                        "Authorization": "Bearer " + AuthorizationLogic.getAccessToken()
                    }
                })
            })
    }

    updatePlaylist(playlist) {
        return this.checkToken()
            .then(() => {
                return fetch(process.env.REACT_APP_BACKEND_URL + `users/${AuthorizationLogic.getUserId()}/playlists/${playlist.id}/`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": "Bearer " + AuthorizationLogic.getAccessToken(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(playlist)
                })
            })
    }

    getUrlWithSearchParam(url, search) {
        if (search && search.length > 0) {
            return `${url}?search=${search}`
        }
        return url
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
                } else {
                    window.location.assign("/signin")
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
