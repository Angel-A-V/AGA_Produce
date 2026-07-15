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

const GREEN_DARK = '#2d5a1b'
const GOLD = '#c9a84c'
const TEXT_DARK = '#3d3228'
const FONT = 'Nunito, sans-serif'

const SERVICES = [
    {
        icon: <LocalShippingIcon />,
        title: 'Wholesale Distribution',
        text: 'Reliable bulk supply of fresh fruits and vegetables for restaurants, markets, and food businesses across the region.',
    },
    {
        icon: <RestaurantIcon />,
        title: 'Foodservice Supply',
        text: 'Consistent quality and dependable volumes for kitchens, caterers, and institutional accounts of every size.',
    },
    {
        icon: <Inventory2Icon />,
        title: 'Repacking & Custom Packs',
        text: 'Flexible pack sizes and custom orders, from full cases to specialty counts, built around how you operate.',
    },
    {
        icon: <AcUnitIcon />,
        title: 'Cold Chain Transport',
        text: 'Refrigerated trucks keep produce at temperature from our warehouse to your door, so it arrives market-fresh.',
    },
    {
        icon: <StorefrontIcon />,
        title: 'Daily Delivery',
        text: 'Six-day-a-week delivery across the greater Los Angeles area, with windows that fit your prep schedule.',
    },
]

function Services() {
    const pageRef = useRef(null)

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
                    sx={{ fontFamily: FONT, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', fontSize: '0.8rem', color: GOLD, mb: 1.25 }}
                >
                    What We Do
                </Typography>
                <Typography
                    component="h2"
                    className="svc-reveal"
                    sx={{ fontFamily: FONT, fontWeight: 900, fontSize: { xs: '1.9rem', md: '2.5rem' }, color: GREEN_DARK, lineHeight: 1.1 }}
                >
                    Our Services
                </Typography>
                <Typography
                    className="svc-reveal"
                    sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.05rem', color: TEXT_DARK, opacity: 0.75, mt: 1.5, maxWidth: 600, mx: 'auto' }}
                >
                    From sourcing to your door, we handle the produce side so you can focus on your business.
                </Typography>
            </Box>

            <Box className="services-wrap">
                <Box className="gridB">
                    {SERVICES.map((s) => (
                        <Box className="cardB svc-reveal" key={s.title}>
                            <div className="cardB-icon">{s.icon}</div>
                            <div>
                                <p className="cardB-title">{s.title}</p>
                                <p className="cardB-text">{s.text}</p>
                            </div>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box className="svc-reveal">
                <CertBadges variant="light" />
            </Box>

            <CtaBanner
                className="svc-reveal"
                title="Ready to get started?"
                subtitle="Tell us what you need and we'll put together a quote that works for your business."
            />
        </div>
    )
}

export default Services