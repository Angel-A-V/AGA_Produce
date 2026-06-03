import Navbar from './components/Navbar'
import ScrollToTop from './components/Scrolltotop'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Products from './pages/Products'
import Services from './pages/Services'
import Safety from './pages/Safety'
import Footer from './components/Footer'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return(
        // Router wraps everything so any component can use navigation hooks
        <Router>
            {/* Resets scroll to top on every route change */}
            <ScrollToTop />
            {/* Navbar sits outside Routes so it renders on every page */}
            <Navbar />  
            <main className="page-content">
                {/* Routes renders only the one Route whose path matches the URL */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/safety" element={<Safety />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    )
}

export default App