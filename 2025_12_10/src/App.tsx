import Home from './routes/home.tsx'
import Page1 from './routes/page1.tsx'
import Page2 from './routes/page2.tsx'
import Page3 from './routes/page3.tsx'
import './App'
import { BrowserRouter, Routes, Route } from "react-router"

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/page1" element={<Page1 />}/>
                <Route path="/page2" element={<Page2 />}/>
                <Route path="/page3" element={<Page3 />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
