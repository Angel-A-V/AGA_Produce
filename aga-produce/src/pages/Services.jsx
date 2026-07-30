import { useRef, useEffect } from 'react'
import { animate, stagger } from 'animejs'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import StorefrontIcon from '@mui/icons-material/Storefront'
import './Services.css'
import CtaBanner from '../components/CtaBanner'
import CertBadges from '../components/CertBadges'
import { useLanguage } from '../i18n/useLanguage'

const GREEN_DARK = '#2d5a1b'
/* Darker gold step than the brand's #c9a84c accent — this one is used
   for eyebrow text on light backgrounds, where #c9a84c fails 4.5:1. */
const EYEBROW_GOLD = '#71591c'
const TEXT_DARK = '#3d3228'
const FONT = 'Nunito, sans-serif'

const ICONS = [LocalShippingIcon, RestaurantIcon, Inventory2Icon, AcUnitIcon, StorefrontIcon]

function Services() {
    const pageRef = useRef(null)
    const { t } = useLanguage()
    const services = t('services.list')

    useEffect(() => {
        if (pageRef.current) {
            animate(pageRef.current.querySelectorAll('.svc-reveal'), {
                opacity: [0, 1],
                translateY: [24, 0],
                delay: stagger(80),
                duration: 650,
                ease: 'out(3)',
            })
        }
    }, [])

    return (
        <div className="services-page" ref={pageRef}>
            <Box sx={{ textAlign: 'center', px: 3, pt: { xs: 12, md: 16 }, pb: { xs: 3, md: 5 } }}>
                <Typography
                    className="svc-reveal"
                    sx={{ fontFamily: FONT, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', fontSize: '0.8rem', color: EYEBROW_GOLD, mb: 1.25 }}
                >
                    {t('services.eyebrow')}
                </Typography>
                <Typography
                    component="h2"
                    className="svc-reveal"
                    sx={{ fontFamily: FONT, fontWeight: 900, fontSize: { xs: '1.9rem', md: '2.5rem' }, color: GREEN_DARK, lineHeight: 1.1 }}
                >
                    {t('services.title')}
                </Typography>
                <Typography
                    className="svc-reveal"
                    sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.05rem', color: TEXT_DARK, opacity: 0.75, mt: 1.5, maxWidth: 600, mx: 'auto' }}
                >
                    {t('services.sub')}
                </Typography>
            </Box>

            <Box className="services-wrap">
                <Box className="gridB">
                    {services.map((s, i) => {
                        const Icon = ICONS[i]
                        return (
                            <Box className="cardB svc-reveal" key={i}>
                                <div className="cardB-icon"><Icon /></div>
                                <div>
                                    <p className="cardB-title">{s.title}</p>
                                    <p className="cardB-text">{s.text}</p>
                                </div>
                            </Box>
                        )
                    })}
                </Box>
            </Box>

            <Box className="svc-reveal">
                <CertBadges variant="light" />
            </Box>

            <CtaBanner
                className="svc-reveal"
                title={t('services.ctaTitle')}
                subtitle={t('services.ctaSubtitle')}
            />
        </div>
    )
}

export default Services
