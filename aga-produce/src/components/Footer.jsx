import { Link } from "react-router-dom"
import InstagramIcon from '@mui/icons-material/Instagram'
import logo from '../assets/logo/logo-transparency.png'
import './Footer.css'

function Footer() {
    return (
        <footer id='footer'>
            <div className='footer-content'>
                <div className='footer-brand'>
                    <img src={logo} alt="AGA Produce Company" className='footer-logo' />
                </div>

                <div className='footer-links'>
                    <h4>Explore</h4>
                    <Link to="/" className="hvr-underline-from-center">Home</Link>
                    <Link to="/about" className="hvr-underline-from-center">About</Link>
                    <Link to="/products" className="hvr-underline-from-center">Products</Link>
                    <Link to="/contact" className="hvr-underline-from-center">Contact</Link>
                </div>

                <div className='footer-contact'>
                    <h4>Get in Touch</h4>
                    <p className='footer-company'>AGA Produce Company Inc. </p>
                    <p>1146 S Vail Ave</p>
                    <p>Montebello, CA 90640</p>
                    <p>Tel: <a href="tel:+13234771177">(323) 477-1177</a></p>
                    <p>Fax: (323) 477-1337</p>
                    <a
                        href="https://www.instagram.com/aga_producecompanyinc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='footer-social'
                    >
                        <InstagramIcon /> @aga_producecompanyinc
                    </a>
                </div>
            </div>

            <div className='footer-bottom'>
                <p>© {new Date().getFullYear()} AGA Produce Company Inc. All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default Footer