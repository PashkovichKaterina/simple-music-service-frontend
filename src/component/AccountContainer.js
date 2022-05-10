import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUser} from "@fortawesome/free-solid-svg-icons"
import AuthorizationLogic from "../service/AuthorizationLogic"

class AccountContainer extends React.PureComponent {
    signOut = () => {
        AuthorizationLogic.deleteAccessToken()
        AuthorizationLogic.deleteRefreshToken()
        window.location.reload()
    }

    render() {
        if (AuthorizationLogic.isUserSignIn()) {
            return (
                <div>
                    <div className="profile-menu-item">
                        <FontAwesomeIcon icon={faUser} className="icon"/>
                        <span>{AuthorizationLogic.getUsername()}</span>
                    </div>
                    <div className="profile-block">
                        <div className="profile-menu-item"
                             onClick={() => window.location.assign("/songs")}>
                            My songs
                        </div>
                        <div className="profile-menu-item"
                             onClick={() => window.location.assign("/playlists")}>
                            My playlists
                        </div>
                        <div className="profile-menu-item"
                             onClick={() => window.location.assign(`/users/${AuthorizationLogic.getUserId()}/comments`)}>
                            My comments
                        </div>
                        <div className="profile-menu-item" onClick={() => window.location.assign("/archive/")}>
                            Archive data
                        </div>
                        <div className="profile-menu-item" onClick={this.signOut}>Sign out</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="profile-menu-item"
                         onClick={() => window.location.assign("/signin")}>
                        Sign in
                    </div>
                    <div className="profile-menu-item"
                         onClick={() => window.location.assign("/signup")}>
                        Sign up
                    </div>
                </div>
            )
        }
    }
}

export default AccountContainer
