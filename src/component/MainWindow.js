import React from "react";
import "../style/MainWindow.css"

const MainWindow = (props) => {
    return (
        <div className="button-block">
            <button onClick={() => window.location.assign("/song")}>Listen to song</button>
            <button onClick={() => window.location.assign("/signup")}>Sign up</button>
            <button onClick={() => window.location.assign("/signin")}>Sign in</button>
        </div>
    )
};

export default MainWindow;
