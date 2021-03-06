import React from "react"
import "../style/MainWindow.css"
import {Route, Routes} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHouse} from "@fortawesome/free-solid-svg-icons"
import AccountContainer from "./AccountContainer"
import SongsContainer from "./song/SongsContainer"
import PrivateRoute from "./PrivateRoute"
import PlaylistsContainer from "./playlist/PlaylistsContainer"
import PlaylistWindow from "./playlist/PlaylistWindow"
import SongCommentWindow from "./comment/SongCommentWindow"
import UserCommentWindow from "./comment/UserCommentWindow"
import NotFound from "./NotFound"
import SongTextWindow from "./text/SongTextWindow"
import ArchiveDataContainer from "./ArchiveDataContainer"

const MainWindow = () => {
    return (
        <div>
            <div className="user-panel">
                <div className="user-inner-panel">
                    <AccountContainer/>
                    <hr/>
                    <div className="profile-menu-item"
                         onClick={() => window.location.assign("/")}>
                        <FontAwesomeIcon icon={faHouse} className="icon"/>
                        <span>Home</span>
                    </div>
                </div>
            </div>
            <div className="active-panel">
                <Routes>
                    <Route path="/" element={<SongsContainer displayedInformation="allSongs"/>}/>
                    <Route path="/songs/:id/comments/" element={<SongCommentWindow/>}/>
                    <Route path="/songs/:id/text/" element={<SongTextWindow/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/songs" element={<SongsContainer displayedInformation="userSongs"/>}/>
                        <Route path="/playlists" element={<PlaylistsContainer/>}/>
                        <Route path="/playlists/:id" element={<PlaylistWindow/>}/>
                        <Route path="/users/:id/comments/" element={<UserCommentWindow/>}/>
                        <Route path="/archive/" element={<ArchiveDataContainer/>}/>
                    </Route>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default MainWindow
