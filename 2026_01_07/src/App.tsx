import './App.scss'
import Nav from "./components/Nav/Nav.tsx"
import Header from "./components/Header/Header.tsx"
import Footer from "./components/Footer/Footer.tsx"
import {BrowserRouter,Routes,Route} from "react-router";
import Home from "./routes/Home/Home.tsx";
import Kategoria from "./routes/Kategoria/Kategoria.tsx";
import Wpis from "./routes/Wpis/Wpis.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Nav/>
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/wpis" element={<Wpis/>}/>
                        <Route path="/kategoria" element={<Kategoria/>}/>
                    </Routes>
                </main>
                <Footer/>
            </BrowserRouter>
        </>
    )
}

export default App
