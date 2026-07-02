import { useRef, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { animate, stagger } from 'animejs'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import SpaIcon from '@mui/icons-material/Spa'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import HandshakeIcon from '@mui/icons-material/Handshake'
import './About.css'
import storyImg from '../assets/home/about.webp'
import crateChar from '../assets/products/crate_char.webp'

const GREEN_DARK = '#2d5a1b'
const GOLD = '#c9a84c'
const TEXT_DARK = '#3d3228'
const FONT = 'Nunito, sans-serif'
const liftHover = 'transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease'

const VALUES = [
    {
        icon: <SpaIcon />,
        title: 'Freshness First',
        text: 'Placeholder copy — describe the company commitment to quality and the "only fresh goods" promise here.',
    },
    {
        icon: <Diversity3Icon />,
        title: 'Family-Run',
        text: 'Placeholder copy — a few sentences about the family behind AGA Produce and the team culture.',
    },
    {
        icon: <LocalShippingIcon />,
        title: 'Dependable Delivery',
        text: 'Placeholder copy — note the delivery reach, schedule, and reliability customers can count on.',
    },
    {
        icon: <HandshakeIcon />,
        title: 'Community Rooted',
        text: 'Placeholder copy — speak to relationships with growers, customers, and the local community.',
    },
]

const STATS = [
    { num: '2020', label: 'Founded' },
    { num: '6 Days', label: 'Delivering Weekly' },
    { num: 'LA', label: 'Wide Reach' },
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

            <Box
                className="about-reveal"
                sx={{ bgcolor: GREEN_DARK, py: { xs: 4, md: 5 }, px: 3, mb: { xs: 6, md: 9 } }}
            >
                <Box sx={{ maxWidth: 1000, mx: 'auto', display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: { xs: 3, sm: 2 }, textAlign: 'center' }}>
                    {STATS.map((s) => (
                        <Box key={s.label}>
                            <Typography sx={{ fontFamily: FONT, fontWeight: 900, fontSize: { xs: '2rem', md: '2.6rem' }, color: GOLD, lineHeight: 1 }}>
                                {s.num}
                            </Typography>
                            <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', mt: 1 }}>
                                {s.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box sx={{ textAlign: 'center', px: 3, pb: { xs: 2, md: 3 } }}>
                <Typography className="about-reveal" sx={{ fontFamily: FONT, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.78rem', color: GOLD, mb: 1 }}>
                    What We Stand For
                </Typography>
                <Typography component="h3" className="about-reveal" sx={{ fontFamily: FONT, fontWeight: 900, fontSize: { xs: '1.7rem', md: '2.2rem' }, color: GREEN_DARK }}>
                    Our Values
                </Typography>
            </Box>

            <Box
                sx={{ maxWidth: 1100, mx: 'auto', px: 3, pt: { xs: 3, md: 4 }, pb: { xs: 6, md: 9 }, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 4 }}
            >
                {VALUES.map((v) => (
                    <Box
                        key={v.title}
                        className="about-reveal"
                        sx={{ bgcolor: '#ffffff', borderRadius: 4, p: { xs: 3.5, md: 4 }, boxShadow: 3, transition: 'transform 0.25s ease, box-shadow 0.25s ease', '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 } }}
                    >
                        <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: 'rgba(45,90,27,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN_DARK, mb: 2.5, '& svg': { fontSize: 28 } }}>
                            {v.icon}
                        </Box>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 800, fontSize: '1.2rem', color: GREEN_DARK, mb: 1 }}>
                            {v.title}
                        </Typography>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1rem', color: TEXT_DARK, opacity: 0.82, lineHeight: 1.6 }}>
                            {v.text}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box sx={{ px: 3, pb: { xs: 8, md: 12 } }}>
                <Box
                    className="about-reveal"
                    sx={{ maxWidth: 1100, mx: 'auto', bgcolor: GREEN_DARK, borderRadius: 4, p: { xs: 4, md: 5 }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 3, textAlign: { xs: 'center', md: 'left' }, boxShadow: 3 }}
                >
                    <Box>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.7rem' }, color: '#fff', mb: 0.75 }}>
                            Want to work with us?
                        </Typography>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.02rem', color: 'rgba(255,255,255,0.85)', maxWidth: 560 }}>
                            Reach out and our team will help you get the fresh produce your business needs.
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
                        sx={{ fontFamily: FONT, fontWeight: 800, textTransform: 'none', fontSize: '1.05rem', bgcolor: GOLD, color: '#1a2e0f', px: 4, py: 1.5, borderRadius: 2, whiteSpace: 'nowrap', flexShrink: 0, transition: liftHover, '&:hover': { bgcolor: '#b89640', transform: 'translateY(-3px)', boxShadow: '0 10px 22px rgba(0,0,0,0.28)' } }}
                    >
                        Contact Us
                    </Button>
                </Box>
            </Box>
        </div>
    )
}

export default About