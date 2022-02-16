import React from "react";
import "../style/MainWindow.css"
import {Route, Routes} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import AccountContainer from "./AccountContainer";
import SongsContainer from "./song/SongsContainer";

const MainWindow = (props) => {
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
                    <div className="profile-menu-item">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/>
                        <span>Search</span>
                    </div>
                </div>
            </div>
            <div className="active-panel">
                <Routes>
                    <Route path="/" element={<SongsContainer/>}/>
                </Routes>
            </div>
        </div>
    )
};

export default MainWindow;
