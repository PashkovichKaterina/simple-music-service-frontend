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

    getAllSongs(page, pageSize, search, sorting) {
        const url = this.getUrlWithParameters(process.env.REACT_APP_BACKEND_URL + "songs/", page, pageSize, search, sorting)
        return this.checkToken()
            .then(() => {
                if (AuthorizationLogic.isValidAccessToken()) {
                    return fetch(url, {
                        headers: {
                            "Authorization": "Bearer " + AuthorizationLogic.getAccessToken()
                        },
                    })
                } else {
                    return fetch(url)
                }
            })
    }

    getSongsByUserId(page, pageSize, search, sorting) {
        const url = this.getUrlWithParameters(
            process.env.REACT_APP_BACKEND_URL + `users/${AuthorizationLogic.getUserId()}/songs/`,
            page, pageSize, search, sorting
        )
        return this.checkToken()
            .then(() => {
                if (AuthorizationLogic.isValidAccessToken()) {
                    return fetch(url, {
                        headers: {
                            "Authorization": "Bearer " + AuthorizationLogic.getAccessToken()
                        },
                    })
                } else {
                    return fetch(url)
                }
            })
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

    deleteSong(songId) {
        return this.checkToken()
            .then(() => {
                return fetch(process.env.REACT_APP_BACKEND_URL + `users/${AuthorizationLogic.getUserId()}/songs/${songId}/`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + AuthorizationLogic.getAccessToken()
                    }
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

    getPlaylistByUserId(page, pageSize, search, sorting) {
        return this.checkToken()
            .then(() => {
                return fetch(
                    this.getUrlWithParameters(
                        process.env.REACT_APP_BACKEND_URL + `users/${AuthorizationLogic.getUserId()}/playlists/`,
                        page, pageSize, search, sorting
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

    saveSongRating(songId, mark) {
        return this.checkToken()
            .then(() => {
                return fetch(process.env.REACT_APP_BACKEND_URL + `songs/${songId}/ratings/`, {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + AuthorizationLogic.getAccessToken(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({"mark": mark})
                })
            })
    }

    updateSongRating(songId, ratingId, mark) {
        return this.checkToken()
            .then(() => {
                return fetch(process.env.REACT_APP_BACKEND_URL + `songs/${songId}/ratings/${ratingId}/`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": "Bearer " + AuthorizationLogic.getAccessToken(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({"mark": mark})
                })
            })
    }

    getSongById(songId) {
        return this.checkToken()
            .then(() => {
                if (AuthorizationLogic.isValidAccessToken()) {
                    return fetch(process.env.REACT_APP_BACKEND_URL + `songs/${songId}/`, {
                        headers: {
                            "Authorization": "Bearer " + AuthorizationLogic.getAccessToken()
                        },
                    })
                } else {
                    return fetch(process.env.REACT_APP_BACKEND_URL + `songs/${songId}/`)
                }
            })
    }

    getSongComments(songId, page, pageSize) {
        return fetch(this.getUrlWithParameters(process.env.REACT_APP_BACKEND_URL + `songs/${songId}/comments/`, page, pageSize))
    }

    createComment(songId, message) {
        return this.checkToken()
            .then(() => {
                return fetch(process.env.REACT_APP_BACKEND_URL + `songs/${songId}/comments/`, {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + AuthorizationLogic.getAccessToken(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({"message": message})
                })
            })
    }

    deleteComment(songId, commentId) {
        return this.checkToken()
            .then(() => {
                return fetch(process.env.REACT_APP_BACKEND_URL + `songs/${songId}/comments/${commentId}/`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + AuthorizationLogic.getAccessToken()
                    }
                })
            })
    }

    editComment(songId, commentId, message) {
        return this.checkToken()
            .then(() => {
                return fetch(process.env.REACT_APP_BACKEND_URL + `songs/${songId}/comments/${commentId}/`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": "Bearer " + AuthorizationLogic.getAccessToken(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({"message": message})
                })
            })
    }

    getUserComments(page, pageSize) {
        return this.checkToken()
            .then(() => {
                return fetch(this.getUrlWithParameters(process.env.REACT_APP_BACKEND_URL + `users/${AuthorizationLogic.getUserId()}/comments/`, page, pageSize), {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + AuthorizationLogic.getAccessToken(),
                        "Content-Type": "application/json",
                    }
                })
            })
    }

    getUrlWithParameters(url, page, pageSize, search, sorting) {
        let parameters = this.getUrlParameter("page", page) + this.getUrlParameter("page_size", pageSize)
            + this.getUrlParameter("search", search) + this.getUrlParameter("ordering", sorting)
        if (parameters && parameters.length > 0) {
            parameters = parameters.replace("&", "?")
        }
        return url + parameters
    }

    getUrlParameter(name, value) {
        if (value && value.toString().length > 0) {
            return `&${name}=${value}`
        }
        return ""
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
        if (AuthorizationLogic.getAccessToken() && !AuthorizationLogic.isValidAccessToken()) {
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
