import Home from './JavaScript/Home'
import NavBar from './JavaScript/NavBar'
import Send from './JavaScript/Send'
import Receive from './JavaScript/Recieve'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/send" element={<Send />} />
                    <Route path="/download" element={<Receive />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
