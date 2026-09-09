import { Link } from 'react-router-dom'
import './Footer.css'
import logo from '../assets/logo/logo-transparency.webp'
import { useCopy } from '../i18n/useCopy'
import { sharedCopy } from './shared.copy'
import {
    PHONE, PHONE_HREF, EMAIL,
    ADDRESS_LINE1, ADDRESS_LINE2, IG_URL, TIKTOK_URL,
} from '../siteInfo'

function Footer() {
    const copy = useCopy(sharedCopy)
    const c = copy.footer
    const nav = copy.nav
    const year = new Date().getFullYear()

    return (
        <footer className="aga-footer">
            <div className="aga-footer-grid">
                <div className="aga-footer-brand">
                    <img src={logo} alt="AGA Produce Company" />
                    <span className="aga-footer-name">AGA Produce Company Inc.</span>
                    <span>{ADDRESS_LINE1}<br />{ADDRESS_LINE2}</span>
                </div>

                <div className="aga-footer-col">
                    <span className="aga-footer-head">{c.explore}</span>
                    <Link to="/">{nav.home}</Link>
                    <Link to="/about">{nav.about}</Link>
                    <Link to="/products">{nav.products}</Link>
                    <Link to="/contact">{nav.contact}</Link>
                </div>

                <div className="aga-footer-col">
                    <span className="aga-footer-head">{c.company}</span>
                    <Link to="/services">{nav.services}</Link>
                    <Link to="/safety">{nav.safety}</Link>
                </div>

                <div className="aga-footer-col">
                    <span className="aga-footer-head">{c.touch}</span>
                    <a href={PHONE_HREF}>{c.tel}</a>
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    <div className="aga-footer-socials">
                        <a href={IG_URL} target="_blank" rel="noreferrer" aria-label={nav.instagram}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                                <rect x="3" y="3" width="18" height="18" rx="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                        <a href={TIKTOK_URL} target="_blank" rel="noreferrer" aria-label={nav.tiktok}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M14.5 3.5v10.2a3.8 3.8 0 1 1-3.8-3.8" />
                                <path d="M14.5 3.5c.3 2.6 2.3 4.5 4.9 4.7" />
                            </svg>
                        </a>
                    </div>
                    <span className="aga-footer-phone-print">{PHONE}</span>
                </div>
            </div>

            <div className="aga-footer-bar">
                <span>{c.rights.replace('{year}', year)}</span>
            </div>
        </footer>
    )
}

export default Footer
