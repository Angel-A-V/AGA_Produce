import { useRef, useEffect } from 'react'
import { animate, stagger } from 'animejs'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import './About.css'
import storyImg from '../assets/home/about.webp'
import CtaBanner from '../components/CtaBanner'
import StatsBand from '../components/StatsBand'
import { useLanguage } from '../i18n/useLanguage'

const GREEN_DARK = '#2d5a1b'
/* Darker gold step than the brand's #c9a84c accent — this one is used
   for eyebrow text on light backgrounds, where #c9a84c fails 4.5:1. */
const EYEBROW_GOLD = '#71591c'
const TEXT_DARK = '#3d3228'
const FONT = 'Nunito, sans-serif'

function About() {
    const pageRef = useRef(null)
    const { t } = useLanguage()
    const values = t('about.values')
    const statsLabels = t('about.statsLabels')

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
                <Typography className="about-reveal" sx={{ fontFamily: FONT, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', fontSize: '0.8rem', color: EYEBROW_GOLD, mb: 1.25 }}>
                    {t('about.eyebrow')}
                </Typography>
                <Typography component="h2" className="about-reveal" sx={{ fontFamily: FONT, fontWeight: 900, fontSize: { xs: '2rem', md: '2.6rem' }, color: GREEN_DARK, lineHeight: 1.1 }}>
                    {t('about.title')}
                </Typography>
                <Typography className="about-reveal" sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.05rem', color: TEXT_DARK, opacity: 0.75, mt: 1.5, maxWidth: 640, mx: 'auto' }}>
                    {t('about.sub')}
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
                            {t('about.startedTitle')}
                        </Typography>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.08rem', color: TEXT_DARK, opacity: 0.85, lineHeight: 1.65, mb: 2 }}>
                            {t('about.para1')}
                        </Typography>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.08rem', color: TEXT_DARK, opacity: 0.85, lineHeight: 1.65 }}>
                            {t('about.para2')}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box className="about-reveal" sx={{ mb: { xs: 6, md: 9 } }}>
                <StatsBand
                    stats={[
                        { value: 2020, label: statsLabels[0] },
                        { value: 6, suffix: ' Days', label: statsLabels[1] },
                        { value: 'LA', label: statsLabels[2] },
                    ]}
                />
            </Box>

            <Box className="value-wrap about-reveal">
                <Typography className="vg-eyebrow">{t('about.valuesEyebrow')}</Typography>
                <Typography className="vg-title">{t('about.valuesTitle')}</Typography>
                <Typography className="vg-sub">{t('about.valuesSub')}</Typography>
                <Box className="rowsA">
                    {values.map((v) => (
                        <Box className="rowA" key={v.num}>
                            <span className="rowA-num">{v.num}</span>
                            <div>
                                <p className="rowA-title">{v.title}</p>
                                <p className="rowA-text">{v.text}</p>
                            </div>
                        </Box>
                    ))}
                </Box>
            </Box>

            <CtaBanner
                className="about-reveal"
                title={t('about.ctaTitle')}
                subtitle={t('about.ctaSubtitle')}
            />
        </div>
    )
}

export default About
