import "../style/App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import SignInContainer from "./form/SignInContainer"
import SignUpContainer from "./form/SignUpContainer"
import MainWindow from "./MainWindow"
import UploadSongContainer from "./form/UploadSongContainer"
import React from "react"
import PrivateRoute from "./PrivateRoute"
import CreatePlaylistContainer from "./form/CreatePlaylistContainer"

function App() {
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Routes>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/upload" element={<UploadSongContainer/>}/>
                        <Route path="/create-playlist" element={<CreatePlaylistContainer/>}/>
                    </Route>
                    <Route path="/signin" element={<SignInContainer/>}/>
                    <Route path="/signup" element={<SignUpContainer/>}/>
                    <Route path="/*" element={<MainWindow/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
