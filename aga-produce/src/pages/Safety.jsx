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
import { useLanguage } from '../i18n/useLanguage'

const GREEN_DARK = '#2d5a1b'
/* Darker gold step than the brand's #c9a84c accent — this one is used
   for eyebrow text on light backgrounds, where #c9a84c fails 4.5:1. */
const EYEBROW_GOLD = '#71591c'
const TEXT_DARK = '#3d3228'
const FONT = 'Nunito, sans-serif'

const TILE_ICONS = [VerifiedUserIcon, CleaningServicesIcon, FactCheckIcon]

function Safety() {
    const pageRef = useRef(null)
    const { t } = useLanguage()
    const heroPillar = t('safety.heroPillar')
    const tiles = t('safety.tiles')

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
                <Typography className="safety-reveal" sx={{ fontFamily: FONT, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', fontSize: '0.8rem', color: EYEBROW_GOLD, mb: 1.25 }}>
                    {t('safety.eyebrow')}
                </Typography>
                <Typography component="h2" className="safety-reveal" sx={{ fontFamily: FONT, fontWeight: 900, fontSize: { xs: '1.9rem', md: '2.5rem' }, color: GREEN_DARK, lineHeight: 1.1 }}>
                    {t('safety.title')}
                </Typography>
                <Typography className="safety-reveal" sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.05rem', color: TEXT_DARK, opacity: 0.75, mt: 1.5, maxWidth: 620, mx: 'auto' }}>
                    {t('safety.sub')}
                </Typography>
            </Box>

            <Box className="safety-wrap">
                <Box className="heroC safety-reveal">
                    <div className="heroC-icon"><AcUnitIcon sx={{ fontSize: 32 }} /></div>
                    <div>
                        <p className="heroC-title">{heroPillar.title}</p>
                        <p className="heroC-text">{heroPillar.text}</p>
                    </div>
                </Box>

                <Box className="tilesC">
                    {tiles.map((tile, i) => {
                        const Icon = TILE_ICONS[i]
                        return (
                            <div className="tileC safety-reveal" key={i}>
                                <div className="tileC-icon"><Icon /></div>
                                <p className="tileC-title">{tile.title}</p>
                                <p className="tileC-text">{tile.text}</p>
                            </div>
                        )
                    })}
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
                    subtext={t('safety.certSubtext')}
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
                            {t('safety.sectionTitle')}
                        </Typography>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.08rem', color: TEXT_DARK, opacity: 0.85, lineHeight: 1.65, mb: 2 }}>
                            {t('safety.para1')}
                        </Typography>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.08rem', color: TEXT_DARK, opacity: 0.85, lineHeight: 1.65 }}>
                            {t('safety.para2')}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <CtaBanner
                className="safety-reveal"
                title={t('safety.ctaTitle')}
                subtitle={t('safety.ctaSubtitle')}
            />
        </div>
    )
}

export default Safety
