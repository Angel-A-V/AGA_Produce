import { useRef, useEffect } from 'react'
import { animate, stagger } from 'animejs'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import './About.css'
import storyImg from '../assets/home/about.webp'
import CtaBanner from '../components/CtaBanner'
import StatsBand from '../components/StatsBand'

const GREEN_DARK = '#2d5a1b'
const GOLD = '#c9a84c'
const TEXT_DARK = '#3d3228'
const FONT = 'Nunito, sans-serif'

const VALUES = [
    ['01', 'Freshness First', 'Our commitment to quality and the "only fresh goods" promise, on every order.'],
    ['02', 'Family-Run', 'The family behind AGA Produce and the team culture that keeps us grounded.'],
    ['03', 'Dependable Delivery', 'Delivery reach, schedule, and reliability customers can count on.'],
    ['04', 'Community Rooted', 'Relationships with growers, customers, and the local community.'],
]

/* Hoisted so its identity is stable — StatsBand animates it once. */
const ABOUT_STATS = [
    { value: 2020, label: 'Founded' },
    { value: 6, suffix: ' Days', label: 'Delivering Weekly' },
    { value: 'LA', label: 'Wide Reach' },
]

function About() {
    const pageRef = useRef(null)

    useEffect(() => {
        if (pageRef.current) {
            animate(pageRef.current.querySelectorAll('.about-reveal'), {
                opacity: [0, 1],
                translateY: [24, 0],
                delay: stagger(80),
                duration: 650,
                ease: 'out(3)',
            })
        }
    }, [])

    return (
        <div className="about-page" ref={pageRef}>
            <Box sx={{ textAlign: 'center', px: 3, pt: { xs: 12, md: 16 }, pb: { xs: 3, md: 5 } }}>
                <Typography className="about-reveal" sx={{ fontFamily: FONT, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', fontSize: '0.8rem', color: GOLD, mb: 1.25 }}>
                    Our Story
                </Typography>
                <Typography component="h2" className="about-reveal" sx={{ fontFamily: FONT, fontWeight: 900, fontSize: { xs: '2rem', md: '2.6rem' }, color: GREEN_DARK, lineHeight: 1.1 }}>
                    About AGA Produce Company Inc.
                </Typography>
                <Typography className="about-reveal" sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.05rem', color: TEXT_DARK, opacity: 0.75, mt: 1.5, maxWidth: 640, mx: 'auto' }}>
                    Your trusted family-owned partner for high-quality wholesale produce in Montebello and beyond.
                </Typography>
            </Box>

            <Box sx={{ maxWidth: 1100, mx: 'auto', px: 3, pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 9 } }}>
                <Box
                    className="about-reveal"
                    sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, md: 6 }, alignItems: 'center' }}
                >
                    <Box sx={{ borderRadius: 5, overflow: 'hidden', boxShadow: 4 }}>
                        <Box component="img" src={storyImg} alt="AGA Produce reception" loading="lazy" decoding="async" sx={{ width: '100%', height: { xs: 300, md: 440 }, objectFit: 'cover', display: 'block' }} />
                    </Box>
                    <Box>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 900, fontSize: { xs: '1.6rem', md: '2.1rem' }, color: GREEN_DARK, mb: 2, lineHeight: 1.15 }}>
                            Where it all started
                        </Typography>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.08rem', color: TEXT_DARK, opacity: 0.85, lineHeight: 1.65, mb: 2 }}>
                            AGA Produce Company Inc. was established at the beginning of the year 2020. Our proud owners Julio Cesar Navarro and his wife Gabriela Navarro decided to embark on a new journey, opening a fresh produce business distribution center in Montebello, California. Throughout these past years AGA has enjoyed a long and proud history of providing outstanding service and high quality fruits and vegetables to many companies.
                        </Typography>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.08rem', color: TEXT_DARK, opacity: 0.85, lineHeight: 1.65 }}>
                            The key to its continued growth and success has been, and will continue to be, the dedication of many loyal employees and the support of our suppliers and loyal customers.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box className="about-reveal" sx={{ mb: { xs: 6, md: 9 } }}>
                <StatsBand stats={ABOUT_STATS} />
            </Box>

            <Box className="value-wrap about-reveal">
                <Typography className="vg-eyebrow">What We Stand For</Typography>
                <Typography className="vg-title">Our Values</Typography>
                <Typography className="vg-sub">The principles behind every delivery.</Typography>
                <Box className="rowsA">
                    {VALUES.map(([num, title, text]) => (
                        <Box className="rowA" key={num}>
                            <span className="rowA-num">{num}</span>
                            <div>
                                <p className="rowA-title">{title}</p>
                                <p className="rowA-text">{text}</p>
                            </div>
                        </Box>
                    ))}
                </Box>
            </Box>

            <CtaBanner
                className="about-reveal"
                title="Want to work with us?"
                subtitle="Reach out and our team will help you get the fresh produce your business needs."
            />
        </div>
    )
}

export default About