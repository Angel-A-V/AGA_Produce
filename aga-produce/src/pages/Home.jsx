import { useState, useEffect, useRef, useCallback } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import './Home.css'
import '../components/Buttons.css'
import docks from '../assets/home/docks.webp'
import reception from '../assets/home/reception.webp'
import aboutImg from '../assets/home/about.webp'
import productsImg from '../assets/home/products.webp'
import safetyImg from '../assets/home/safety.webp'
import CtaBanner from '../components/CtaBanner'
import front_side from '../assets/home/sideview_logo.webp'
import trucks from '../assets/contact/contact.webp'
import CertBadges from '../components/CertBadges'
import StatsBand from '../components/StatsBand'
import { useLanguage } from '../i18n/useLanguage'

/* reception leads: a clean, uncluttered first frame. front_side (the
   building's own painted signage) moved off slide 1 — it was colliding
   visually with the H1 overlaid on top of it. */
const SLIDES = [
    { src: reception, alt: 'AGA Produce reception' },
    { src: front_side, alt: 'Side View of the company' },
    { src: trucks, alt: 'AGA Trucks in Dock' },
]

function Home() {
    const { t } = useLanguage()
    const [slide, setSlide] = useState(0)
    const [paused, setPaused] = useState(false)
    const [hovering, setHovering] = useState(false)
    const pageRef = useRef(null)
    const timerRef = useRef(null)

    const next = useCallback(() => setSlide((s) => (s + 1) % SLIDES.length), [])
    const prev = () => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)
    const goTo = (i) => setSlide(i)

    const effectivelyPaused = paused || hovering

    useEffect(() => {
        clearInterval(timerRef.current)
        if (effectivelyPaused) return undefined
        timerRef.current = setInterval(next, 5500)
        return () => clearInterval(timerRef.current)
    }, [next, slide, effectivelyPaused])

    useEffect(() => {
        const els = pageRef.current?.querySelectorAll('.reveal, .home-feature') || []
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('in-view')
                        observer.unobserve(e.target)
                    }
                })
            },
            { threshold: 0.16 }
        )
        els.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const FEATURES = t('home.features')
    const featureImages = [aboutImg, productsImg, docks, safetyImg]
    const featureRoutes = ['/about', '/products', '/services', '/safety']

    return (
        <div className="home" ref={pageRef}>
            <section
                className="home-hero"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onFocus={() => setHovering(true)}
                onBlur={() => setHovering(false)}
            >
                <div className="home-hero-bg">
                    {SLIDES.map((s, i) => (
                        <div key={s.src} className={`home-slide ${i === slide ? 'active' : ''}`}>
                            <img src={s.src} alt={s.alt} loading={i === 0 ? 'eager' : 'lazy'} />
                        </div>
                    ))}
                </div>

                <div className="home-hero-overlay">
                    <p className="home-hero-eyebrow">{t('home.heroEyebrow')}</p>
                    <h1 className="home-hero-title">{t('home.heroTitle')}</h1>
                    <p className="home-hero-sub">{t('home.heroSub')}</p>
                    <div className="home-hero-actions">
                        <Button
                            component={RouterLink}
                            to="/products"
                            disableElevation
                            className="aga-btn aga-btn--gold"
                        >
                            {t('home.browseProducts')}
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/contact"
                            disableElevation
                            className="aga-btn aga-btn--outline"
                        >
                            {t('home.contactUs')}
                        </Button>
                    </div>

                    <button className="home-arrow home-arrow-left" onClick={prev} aria-label={t('home.prevSlide')}>
                        <ChevronLeftIcon />
                    </button>
                    <button className="home-arrow home-arrow-right" onClick={next} aria-label={t('home.nextSlide')}>
                        <ChevronRightIcon />
                    </button>

                    <div className="home-dots">
                        {SLIDES.map((s, i) => (
                            <button
                                key={s.src}
                                className={`home-dot ${i === slide ? 'active' : ''}`}
                                onClick={() => goTo(i)}
                                aria-label={t('home.goToSlide')(i + 1)}
                            />
                        ))}
                    </div>

                    <button
                        className="home-pause"
                        onClick={() => setPaused((p) => !p)}
                        aria-label={paused ? t('home.playSlideshow') : t('home.pauseSlideshow')}
                        aria-pressed={paused}
                    >
                        {paused ? <PlayArrowIcon /> : <PauseIcon />}
                    </button>
                </div>
            </section>

            <div className="home-body">
                <section className="home-intro reveal">
                    <div className="home-intro-inner">
                        <p className="home-intro-eyebrow">{t('home.introEyebrow')}</p>
                        <h2 className="home-intro-title">{t('home.introTitle')}</h2>
                        <p className="home-intro-text">{t('home.introText')}</p>
                    </div>
                </section>

                <StatsBand
                    stats={[
                        { value: new Date().getFullYear() - 2020, suffix: '+', label: t('home.statLabels')[0] },
                        { value: 6, suffix: '', label: t('home.statLabels')[1] },
                        { value: 30, suffix: '+', label: t('home.statLabels')[2] },
                        { value: 100, suffix: '%', label: t('home.statLabels')[3] },
                    ]}
                />

                {FEATURES.map((f, i) => (
                    <section
                        key={i}
                        className={`home-feature ${i % 2 === 1 ? 'reversed' : ''} ${i % 2 === 0 ? 'tone-a' : 'tone-b'}`}
                    >
                        <div className="home-feature-inner">
                            <div className="feature-media">
                                <img src={featureImages[i]} alt={f.title} loading="lazy" decoding="async" />
                            </div>
                            <div className="feature-text">
                                <p className="feature-eyebrow">{f.eyebrow}</p>
                                <h3 className="feature-title">{f.title}</h3>
                                <p className="feature-body">{f.text}</p>
                                <Button
                                    component={RouterLink}
                                    to={featureRoutes[i]}
                                    disableElevation
                                    className="aga-btn aga-btn--green"
                                >
                                    {f.cta}
                                </Button>
                            </div>
                        </div>
                    </section>
                ))}

                <section className="reveal">
                    <CertBadges variant="light" />
                </section>

                <CtaBanner
                    className="reveal"
                    title={t('home.ctaTitle')}
                    subtitle={t('home.ctaSubtitle')}
                />
            </div>
        </div>
    )
}

export default Home
