import { useState, useEffect, useRef, useCallback } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import './Home.css'
import front from '../assets/home/front.webp'
import docks from '../assets/home/docks.webp'
import reception from '../assets/home/reception.webp'
import greens from '../assets/home/greens.webp'
import aboutImg from '../assets/home/about.webp'
import productsImg from '../assets/home/products.webp'
import safetyImg from '../assets/home/safety.webp'
import crateChar from '../assets/products/crate_char.webp'
import front_side from '../assets/home/sideview_logo.webp'
import trucks from '../assets/contact/contact.webp'

const GREEN_DARK = '#2d5a1b'
const GOLD = '#c9a84c'
const FONT = 'Nunito, sans-serif'

const liftHover = 'transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease, border-color 0.25s ease'

const SLIDES = [
    { src: front_side, alt: 'Side View of the company' },
    { src: reception, alt: 'AGA Produce reception' },
    { src: trucks, alt: 'AGA Trucks in Dock'}
]

const FEATURES = [
    {
        eyebrow: 'About Us',
        title: 'Family-run, fresh-obsessed',
        text: 'AGA Produce Company has supplied Los Angeles with quality fruits and vegetables since 2020. We are a wholesale distributor built on one simple promise — only fresh goods.',
        img: aboutImg,
        to: '/about',
        cta: 'Learn About Us',
    },
    {
        eyebrow: 'Our Products',
        title: 'Everything your kitchen needs',
        text: 'Chiles, onions, tomatoes, citrus, leafy greens, dry grains and more — sourced and packed for restaurants, markets, and food businesses across the region.',
        img: productsImg,
        to: '/products',
        cta: 'Browse Products',
    },
    {
        eyebrow: 'Our Services',
        title: 'From our warehouse to your business',
        text: 'Wholesale distribution, six-day-a-week delivery, custom sourcing, and refrigerated transport that keeps produce at temperature all the way to your door.',
        img: docks,
        to: '/services',
        cta: 'See Our Services',
    },
    {
        eyebrow: 'Food Safety',
        title: 'Handled with care, every step',
        text: 'Cold-chain integrity, a trained and equipped team, and clean, inspected facilities. Safety is built into how we receive, store, and deliver every order.',
        img: safetyImg,
        to: '/safety',
        cta: 'Our Safety Standards',
    },
]

function Home() {
    const [slide, setSlide] = useState(0)
    const pageRef = useRef(null)
    const timerRef = useRef(null)

    const next = useCallback(() => setSlide((s) => (s + 1) % SLIDES.length), [])
    const prev = () => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)
    const goTo = (i) => setSlide(i)

    useEffect(() => {
        clearInterval(timerRef.current)
        timerRef.current = setInterval(next, 5500)
        return () => clearInterval(timerRef.current)
    }, [next, slide])

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

    return (
        <div className="home" ref={pageRef}>
            <section className="home-hero">
                <div className="home-hero-bg">
                    {SLIDES.map((s, i) => (
                        <div key={s.src} className={`home-slide ${i === slide ? 'active' : ''}`}>
                            <img src={s.src} alt={s.alt} loading={i === 0 ? 'eager' : 'lazy'} />
                        </div>
                    ))}
                </div>

                <div className="home-hero-overlay">
                    <p className="home-hero-eyebrow">AGA Produce Company</p>
                    <h1 className="home-hero-title">Only Fresh Goods</h1>
                    <p className="home-hero-sub">
                        Wholesale fruits &amp; vegetables, delivered fresh across Los Angeles.
                    </p>
                    <div className="home-hero-actions">
                        <Button
                            component={RouterLink}
                            to="/products"
                            disableElevation
                            sx={{ fontFamily: FONT, fontWeight: 800, textTransform: 'none', fontSize: '1.05rem', bgcolor: GOLD, color: '#1a2e0f', px: 4, py: 1.4, borderRadius: 2, transition: liftHover, '&:hover': { bgcolor: '#b89640', transform: 'translateY(-3px)', boxShadow: '0 10px 24px rgba(0,0,0,0.3)' } }}
                        >
                            Browse Products
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/contact"
                            disableElevation
                            sx={{ fontFamily: FONT, fontWeight: 800, textTransform: 'none', fontSize: '1.05rem', color: '#fff', px: 4, py: 1.4, borderRadius: 2, border: '2px solid rgba(255,255,255,0.85)', transition: liftHover, '&:hover': { bgcolor: 'rgba(255,255,255,0.16)', borderColor: '#fff', transform: 'translateY(-3px)', boxShadow: '0 10px 24px rgba(0,0,0,0.3)' } }}
                        >
                            Contact Us
                        </Button>
                    </div>

                    <button className="home-arrow home-arrow-left" onClick={prev} aria-label="Previous slide">
                        <ChevronLeftIcon />
                    </button>
                    <button className="home-arrow home-arrow-right" onClick={next} aria-label="Next slide">
                        <ChevronRightIcon />
                    </button>

                    <div className="home-dots">
                        {SLIDES.map((s, i) => (
                            <button
                                key={s.src}
                                className={`home-dot ${i === slide ? 'active' : ''}`}
                                onClick={() => goTo(i)}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <div className="home-body">
                <section className="home-intro reveal">
                    <p className="home-intro-eyebrow">Wholesale Produce, Done Right</p>
                    <h2 className="home-intro-title">Fresh produce your business can count on</h2>
                    <p className="home-intro-text">
                        From sourcing to delivery, we handle the produce side so you can focus on your customers. Explore what we do.
                    </p>
                </section>

                {FEATURES.map((f, i) => (
                    <section
                        key={f.to}
                        className={`home-feature ${i % 2 === 1 ? 'reversed' : ''} ${i % 2 === 0 ? 'tone-a' : 'tone-b'}`}
                    >
                        <div className="home-feature-inner">
                            <div className="feature-media">
                                <img src={f.img} alt={f.title} loading="lazy" decoding="async" />
                            </div>
                            <div className="feature-text">
                                <p className="feature-eyebrow">{f.eyebrow}</p>
                                <h3 className="feature-title">{f.title}</h3>
                                <p className="feature-body">{f.text}</p>
                                <Button
                                    component={RouterLink}
                                    to={f.to}
                                    disableElevation
                                    sx={{ fontFamily: FONT, fontWeight: 800, textTransform: 'none', fontSize: '1rem', bgcolor: GREEN_DARK, color: '#fff', px: 3.5, py: 1.3, borderRadius: 2, transition: liftHover, '&:hover': { bgcolor: '#244a16', transform: 'translateY(-3px)', boxShadow: '0 10px 22px rgba(26,46,15,0.3)' } }}
                                >
                                    {f.cta}
                                </Button>
                            </div>
                        </div>
                    </section>
                ))}

                <section className="home-cta-wrap reveal">
                    <Box
                        sx={{
                            maxWidth: 1150,
                            mx: 'auto',
                            bgcolor: GREEN_DARK,
                            borderRadius: 5,
                            p: { xs: 4, md: 5 },
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 3,
                            textAlign: { xs: 'center', md: 'left' },
                            boxShadow: '0 16px 40px rgba(26,46,15,0.2)',
                        }}
                    >
                        <Box>
                            <Typography sx={{ fontFamily: FONT, fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.9rem' }, color: '#fff', mb: 0.75 }}>
                                Ready to order fresh?
                            </Typography>
                            <Typography sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', maxWidth: 560 }}>
                                Tell us what your business needs and we'll get you set up with a quote — fast.
                            </Typography>
                        </Box>
                        <Box
                            component="img"
                            src={crateChar}
                            alt="AGA mascot carrying a crate of produce"
                            loading="lazy"
                            decoding="async"
                            sx={{ height: { xs: 120, md: 175 }, width: 'auto', display: 'block', flexShrink: 0, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.25))' }}
                        />
                        <Button
                            component={RouterLink}
                            to="/contact"
                            disableElevation
                            sx={{ fontFamily: FONT, fontWeight: 800, textTransform: 'none', fontSize: '1.05rem', bgcolor: GOLD, color: '#1a2e0f', px: 4, py: 1.5, borderRadius: 2, whiteSpace: 'nowrap', flexShrink: 0, transition: liftHover, '&:hover': { bgcolor: '#b89640', transform: 'translateY(-3px)', boxShadow: '0 10px 24px rgba(0,0,0,0.3)' } }}
                        >
                            Contact Us
                        </Button>
                    </Box>
                </section>
            </div>
        </div>
    )
}

export default Home