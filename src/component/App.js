import "../style/App.css";
import SongPlayerContainer from "./SongPlayerContainer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignInContainer from "./SignInContainer";
import SignUpContainer from "./SignUpContainer";
import MainWindow from "./MainWindow";

function App() {
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainWindow/>}/>
                    <Route path="/signin" element={<SignInContainer/>}/>
                    <Route path="/signup" element={<SignUpContainer/>}/>
                    <Route path="/song" element={<SongPlayerContainer/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
