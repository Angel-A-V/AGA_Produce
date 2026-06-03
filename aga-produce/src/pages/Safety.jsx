import { useRef, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { animate, stagger } from 'animejs'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import './Safety.css'
import safetyImg from '../assets/home/safety.webp'
import crateChar from '../assets/products/crate_char.webp'

const GREEN_DARK = '#2d5a1b'
const GOLD = '#c9a84c'
const TEXT_DARK = '#3d3228'
const FONT = 'Nunito, sans-serif'

const PILLARS = [
    {
        icon: <AcUnitIcon />,
        title: 'Cold-Chain Integrity',
        text: 'Produce is kept at temperature from the moment it arrives through refrigerated storage and transport, so freshness and safety never break.',
    },
    {
        icon: <VerifiedUserIcon />,
        title: 'Trained & Equipped Team',
        text: 'Our staff work in gloves, hairnets, and hi-vis gear, following handling procedures designed to protect both the product and the people.',
    },
    {
        icon: <CleaningServicesIcon />,
        title: 'Clean, Inspected Facilities',
        text: 'Regular sanitation and routine inspections keep our warehouse and equipment held to a standard we are proud to stand behind.',
    },
    {
        icon: <FactCheckIcon />,
        title: 'Traceable Sourcing',
        text: 'We know where our produce comes from and track it through receiving and weighing, so every order can be accounted for.',
    },
]

function Safety() {
    const pageRef = useRef(null)

    useEffect(() => {
        if (pageRef.current) {
            animate(pageRef.current.querySelectorAll('.safety-reveal'), {
                opacity: [0, 1],
                translateY: [24, 0],
                delay: stagger(80),
                duration: 650,
                ease: 'out(3)',
            })
        }
    }, [])

    return (
        <div className="safety-page" ref={pageRef}>
            <Box sx={{ textAlign: 'center', px: 3, pt: { xs: 12, md: 16 }, pb: { xs: 3, md: 5 } }}>
                <Typography className="safety-reveal" sx={{ fontFamily: FONT, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', fontSize: '0.8rem', color: GOLD, mb: 1.25 }}>
                    Food Safety
                </Typography>
                <Typography component="h2" className="safety-reveal" sx={{ fontFamily: FONT, fontWeight: 900, fontSize: { xs: '1.9rem', md: '2.5rem' }, color: GREEN_DARK, lineHeight: 1.1 }}>
                    Safety In Every Step
                </Typography>
                <Typography className="safety-reveal" sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.05rem', color: TEXT_DARK, opacity: 0.75, mt: 1.5, maxWidth: 620, mx: 'auto' }}>
                    Fresh isn't just about quality — it's about handling produce the right way, from the dock to your door.
                </Typography>
            </Box>

            <Box
                sx={{
                    maxWidth: 1100,
                    mx: 'auto',
                    px: 3,
                    pt: { xs: 4, md: 6 },
                    pb: { xs: 6, md: 8 },
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 4,
                    alignItems: 'stretch',
                }}
            >
                {PILLARS.map((p) => (
                    <Box
                        key={p.title}
                        className="safety-reveal"
                        sx={{ bgcolor: '#ffffff', borderRadius: 4, p: { xs: 3.5, md: 4 }, boxShadow: 3, transition: 'transform 0.25s ease, box-shadow 0.25s ease', '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 } }}
                    >
                        <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: 'rgba(45,90,27,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN_DARK, mb: 2.5, '& svg': { fontSize: 28 } }}>
                            {p.icon}
                        </Box>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 800, fontSize: '1.2rem', color: GREEN_DARK, mb: 1 }}>
                            {p.title}
                        </Typography>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1rem', color: TEXT_DARK, opacity: 0.82, lineHeight: 1.6 }}>
                            {p.text}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box sx={{ maxWidth: 1100, mx: 'auto', px: 3, pb: { xs: 7, md: 10 } }}>
                <Box
                    className="safety-reveal"
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: { xs: 3, md: 6 },
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ borderRadius: 5, overflow: 'hidden', boxShadow: 4 }}>
                        <Box component="img" src={safetyImg} alt="AGA team member weighing produce in protective gear" loading="lazy" decoding="async" sx={{ width: '100%', height: { xs: 320, md: 460 }, objectFit: 'cover', display: 'block' }} />
                    </Box>
                    <Box>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 900, fontSize: { xs: '1.6rem', md: '2.1rem' }, color: GREEN_DARK, mb: 2, lineHeight: 1.15 }}>
                            Protecting the product and the people
                        </Typography>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.08rem', color: TEXT_DARK, opacity: 0.85, lineHeight: 1.65, mb: 2 }}>
                            Every crate that moves through our warehouse is received, weighed, and inspected by trained team members in proper protective equipment. It's a small thing you might never see — and exactly why our customers trust what shows up on their dock.
                        </Typography>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.08rem', color: TEXT_DARK, opacity: 0.85, lineHeight: 1.65 }}>
                            Have a question about our handling or sourcing standards? We're always happy to walk you through them.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ px: 3, pb: { xs: 8, md: 12 } }}>
                <Box
                    className="safety-reveal"
                    sx={{ maxWidth: 1100, mx: 'auto', bgcolor: GREEN_DARK, borderRadius: 4, p: { xs: 4, md: 5 }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 3, textAlign: { xs: 'center', md: 'left' }, boxShadow: 3 }}
                >
                    <Box>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.7rem' }, color: '#fff', mb: 0.75 }}>
                            Questions about our standards?
                        </Typography>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.02rem', color: 'rgba(255,255,255,0.85)', maxWidth: 560 }}>
                            Reach out and our team will gladly walk you through how we keep produce safe.
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
                        sx={{ fontFamily: FONT, fontWeight: 800, textTransform: 'none', fontSize: '1.05rem', bgcolor: GOLD, color: '#1a2e0f', px: 4, py: 1.5, borderRadius: 2, whiteSpace: 'nowrap', flexShrink: 0, transition: 'transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease', '&:hover': { bgcolor: '#b89640', transform: 'translateY(-3px)', boxShadow: '0 10px 22px rgba(0,0,0,0.28)' } }}
                    >
                        Contact Us
                    </Button>
                </Box>
            </Box>
        </div>
    )
}

export default Safety