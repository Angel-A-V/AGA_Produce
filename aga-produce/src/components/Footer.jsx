import { Link } from "react-router-dom"
import logo from '../assets/logo/logo-transparency.png'
import './Footer.css'
import { useLanguage } from '../i18n/useLanguage'

function Footer() {
    const { t } = useLanguage()

    return (
        <footer id='footer'>
            <div className='footer-content'>
                <div className='footer-brand'>
                    <img src={logo} alt="AGA Produce Company" className='footer-logo' />
                </div>

                <div className='footer-col'>
                    <h4>{t('footer.explore')}</h4>
                    <Link to="/">{t('nav.home')}</Link>
                    <Link to="/about">{t('nav.about')}</Link>
                    <Link to="/products">{t('nav.products')}</Link>
                    <Link to="/contact">{t('nav.contact')}</Link>
                </div>

                <div className='footer-col'>
                    <h4>{t('footer.company')}</h4>
                    <Link to="/services">{t('nav.services')}</Link>
                    <Link to="/safety">{t('nav.safety')}</Link>
                </div>

                <div className='footer-contact'>
                    <h4>{t('footer.getInTouch')}</h4>
                    <p className='footer-company'>AGA Produce Company Inc.</p>
                    <p>1146 S Vail Ave<br />Montebello, CA 90640</p>
                    <p>Tel: <a href="tel:+13234771177">(323) 477-1177</a></p>
                    <p>Email: <a href="mailto:Agaproinfo1@gmail.com">Agaproinfo1@gmail.com</a></p>

                    <div className='footer-socials'>
                        <a
                            className='footer-social'
                            href="https://www.instagram.com/aga_producecompanyinc/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.2" cy="6.8" r="1" />
                            </svg>
                        </a>
                        <a
                            className='footer-social'
                            href="https://www.tiktok.com/@aga.produce.company.inc"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="TikTok"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14 3c.4 2.2 1.9 3.7 4 4v3c-1.5 0-2.9-.4-4-1.2v6.6a5 5 0 1 1-4-4.9v3.1a2 2 0 1 0 1.4 1.9V3h2.6z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className='footer-bottom'>
                <p>{t('footer.rights')(new Date().getFullYear())}</p>
            </div>
        </footer>
    )
}

export default Footer