import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'
import logo from '../assets/logo/logo-transparency.webp'
import fruit from '../assets/logo/fruit-bowl.webp'
import character from '../assets/logo/aga_c.webp'
import { useLanguage } from '../i18n/useLanguage'
import { useCopy } from '../i18n/useCopy'
import { sharedCopy } from './shared.copy'
import { homeCopy } from '../pages/Home.copy'
import { IG_URL, TIKTOK_URL } from '../siteInfo'
import { useSectionSpy } from '../hooks/useAgaMotion'

function InstagramIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
    )
}

function TiktokIcon() {
    return (
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14.5 3.5v10.2a3.8 3.8 0 1 1-3.8-3.8" />
            <path d="M14.5 3.5c.3 2.6 2.3 4.5 4.9 4.7" />
        </svg>
    )
}

const HOME_SECTIONS = ['intro', 'about', 'products', 'repacking', 'safety', 'contact']

function SectionRail({ labels }) {
    const { active, shown } = useSectionSpy(HOME_SECTIONS)
    return (
        <div className={`aga-nav-rail${shown ? ' is-shown' : ''}`} aria-hidden="true">
            <div className="aga-nav-rail-inner">
                <span className="aga-nav-rail-mark">AGA</span>
                {labels.map((l, i) => (
                    <span key={l} className={`aga-nav-rail-item${i === active ? ' is-active' : ''}`}>{l}</span>
                ))}
            </div>
        </div>
    )
}

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [aboutOpen, setAboutOpen] = useState(false)
    const { toggleLang, spanishEnabled } = useLanguage()
    const c = useCopy(sharedCopy).nav
    const railLabels = useCopy(homeCopy).index

    const location = useLocation()
    const aboutActive = ['/about', '/services', '/safety'].includes(location.pathname)
    const isHome = location.pathname === '/'

    const [lastPath, setLastPath] = useState(location.pathname)
    if (lastPath !== location.pathname) {
        setLastPath(location.pathname)
        setMenuOpen(false)
        setAboutOpen(false)
    }

    useEffect(() => {
        const onResize = () => { if (window.innerWidth > 1080) setMenuOpen(false) }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        const onScroll = () => setScrolled((prev) => (prev ? window.scrollY >= 40 : window.scrollY > 90))
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const linkClass = ({ isActive }) => `aga-nav-link${isActive ? ' is-active' : ''}`
    const closeAll = () => { setMenuOpen(false); setAboutOpen(false) }

    return (
        <header className={`aga-nav${scrolled ? ' is-scrolled' : ''}`}>
            <div className="aga-nav-bar">
                <img className="aga-nav-fruit aga-nav-fruit--l" src={fruit} alt="" aria-hidden="true" />
                <img className="aga-nav-fruit aga-nav-fruit--r" src={fruit} alt="" aria-hidden="true" />

                <div className="aga-nav-logo">
                    <Link to="/" onClick={closeAll}>
                        <img src={logo} alt="AGA Produce Company" />
                    </Link>
                </div>

                <button
                    type="button"
                    className="aga-nav-burger"
                    aria-label={c.menu}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(o => !o)}
                >
                    <span /><span /><span />
                </button>

                <nav className={`aga-nav-links${menuOpen ? ' is-open' : ''}`}>
                    <NavLink to="/" end className={linkClass} onClick={closeAll}>{c.home}</NavLink>

                    <div className={`aga-nav-drop${aboutOpen ? ' is-open' : ''}`}>
                        <div className="aga-nav-drop-trigger">
                            <NavLink
                                to="/about"
                                className={({ isActive }) => `aga-nav-link${isActive || aboutActive ? ' is-active' : ''}`}
                                onClick={closeAll}
                            >
                                {c.about}
                            </NavLink>
                            <button
                                type="button"
                                className="aga-nav-drop-toggle"
                                aria-label={c.toggleAbout}
                                aria-expanded={aboutOpen}
                                onClick={() => setAboutOpen(o => !o)}
                            >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </button>
                        </div>
                        <div className="aga-nav-drop-menu">
                            <NavLink to="/services" className="aga-nav-drop-item" onClick={closeAll}>{c.services}</NavLink>
                            <NavLink to="/safety" className="aga-nav-drop-item" onClick={closeAll}>{c.safety}</NavLink>
                        </div>
                    </div>

                    <NavLink to="/products" className={linkClass} onClick={closeAll}>{c.products}</NavLink>
                    <NavLink to="/contact" className={linkClass} onClick={closeAll}>{c.contact}</NavLink>

                    {spanishEnabled && (
                        <button type="button" className="aga-nav-lang aga-nav-lang--sheet" onClick={toggleLang} aria-label={c.switchLang}>
                            {c.langShort}
                        </button>
                    )}
                </nav>

                <div className="aga-nav-util">
                    {spanishEnabled && (
                        <button type="button" className="aga-nav-lang" onClick={toggleLang} aria-label={c.switchLang}>
                            {c.langShort}
                        </button>
                    )}
                    <a href={IG_URL} target="_blank" rel="noreferrer" className="aga-nav-social" aria-label={c.instagram}>
                        <InstagramIcon />
                    </a>
                    <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="aga-nav-social" aria-label={c.tiktok}>
                        <TiktokIcon />
                    </a>
                    <img className="aga-nav-mascot" src={character} alt="" aria-hidden="true" />
                </div>
            </div>
            {isHome && <SectionRail labels={railLabels} />}
        </header>
    )
}

export default Navbar
