import jwt_decode from "jwt-decode"

const ACCESS_TOKEN = "accessToken"
const REFRESH_TOKEN = "refreshToken"

class AuthorizationLogic {
    isUserSignIn() {
        return localStorage.getItem(ACCESS_TOKEN) !== null
    }

    setAccessToken(token) {
        localStorage.setItem(ACCESS_TOKEN, token)
    }

    setRefreshToken(token) {
        localStorage.setItem(REFRESH_TOKEN, token)
    }

    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN)
    }

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN)
    }

    deleteAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN)
    }

    deleteRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN)
    }

    getUsername() {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            return jwt_decode(token).username
        }
    }

    getUserId() {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            return jwt_decode(token).user_id
        }
    }

    isValidAccessToken() {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            return Date.now() < jwt_decode(token).exp + "000"
        }
        return false
    }
}

export default new AuthorizationLogic()
