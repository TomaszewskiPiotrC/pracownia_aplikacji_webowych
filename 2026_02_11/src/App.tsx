import './App.scss'
import Nav from "./components/Nav/Nav.tsx"
import Header from "./components/Header/Header.tsx"
import Footer from "./components/Footer/Footer.tsx"
import {BrowserRouter, Routes, Route} from "react-router"
import Home from "./routes/Home/Home.tsx"
import Kategoria from "./routes/Kategoria/Kategoria.tsx"
import PostsList from "./routes/PostsList/PostsList.tsx"
import Post from "./routes/Post/Post.tsx"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Header/>
                <Nav/>
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/kategoria" element={<Kategoria/>}/>
                        <Route path="/posts" element={<PostsList/>}/>
                        <Route path="/posts/:id" element={<Post/>}/>
                    </Routes>
                </main>
                <Footer/>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App