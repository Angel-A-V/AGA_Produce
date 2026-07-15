import { useRef, useEffect } from 'react'
import { animate, stagger } from 'animejs'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import './Safety.css'
import safetyImg from '../assets/home/safety.webp'
import CtaBanner from '../components/CtaBanner'
import CertBadges from '../components/CertBadges'

const GREEN_DARK = '#2d5a1b'
const GOLD = '#c9a84c'
const TEXT_DARK = '#3d3228'
const FONT = 'Nunito, sans-serif'

const HERO_PILLAR = {
    icon: <AcUnitIcon sx={{ fontSize: 32 }} />,
    title: 'Cold-Chain Integrity',
    text: 'Produce is kept at temperature from the moment it arrives through refrigerated storage and transport, so freshness and safety never break.',
}

const TILES = [
    {
        icon: <VerifiedUserIcon />,
        title: 'Trained & Equipped Team',
        text: 'Gloves, hairnets, and hi-vis gear, following procedures that protect product and people.',
    },
    {
        icon: <CleaningServicesIcon />,
        title: 'Clean, Inspected Facilities',
        text: 'Regular sanitation and routine inspections keep our warehouse held to a standard.',
    },
    {
        icon: <FactCheckIcon />,
        title: 'Traceable Sourcing',
        text: 'We track produce through receiving and weighing, so every order can be accounted for.',
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

            <Box className="safety-wrap">
                <Box className="heroC safety-reveal">
                    <div className="heroC-icon">{HERO_PILLAR.icon}</div>
                    <div>
                        <p className="heroC-title">{HERO_PILLAR.title}</p>
                        <p className="heroC-text">{HERO_PILLAR.text}</p>
                    </div>
                </Box>

                <Box className="tilesC">
                    {TILES.map((t) => (
                        <div className="tileC safety-reveal" key={t.title}>
                            <div className="tileC-icon">{t.icon}</div>
                            <p className="tileC-title">{t.title}</p>
                            <p className="tileC-text">{t.text}</p>
                        </div>
                    ))}
                </Box>
            </Box>

            <Box
                className="safety-reveal"
                sx={{
                    background: 'linear-gradient(135deg, #1c3d10, #2d5a1b 65%, #35661f)',
                    py: { xs: 1, md: 2 },
                    mb: { xs: 6, md: 8 },
                }}
            >
                <CertBadges
                    variant="dark"
                    subtext="AGA is audited and inspected against recognized food-safety and quality standards."
                />
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

            <CtaBanner
                className="safety-reveal"
                title="Questions about our standards?"
                subtitle="Reach out and our team will gladly walk you through how we keep produce safe."
            />
        </div>
    )
}

export default Safety