import jwt_decode from "jwt-decode"

const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

class AuthorizationLogic {
    isUserSignIn() {
        return localStorage.getItem(ACCESS_TOKEN) !== null;
    }

    setAccessToken(token) {
        localStorage.setItem(ACCESS_TOKEN, token);
    }

    setRefreshToken(token) {
        localStorage.setItem(REFRESH_TOKEN, token);
    }

    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN);
    }

    deleteAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN);
    }

    deleteRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN);
    }

    getUsername() {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            return jwt_decode(token).username;
        }
    }

    getUserId() {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            return jwt_decode(token).user_id;
        }
    }
}

export default new AuthorizationLogic()
