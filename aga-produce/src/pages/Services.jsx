import { useRef, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { animate, stagger } from 'animejs'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import SearchIcon from '@mui/icons-material/Search'
import StorefrontIcon from '@mui/icons-material/Storefront'
import './Services.css'
import crateChar from '../assets/products/crate_char.webp'

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

            <Box
                sx={{
                    maxWidth: 1100,
                    mx: 'auto',
                    px: 3,
                    pt: { xs: 4, md: 6 },
                    pb: { xs: 6, md: 8 },
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 4,
                    alignItems: 'stretch',
                }}
            >
                {SERVICES.map((s) => (
                    <Box
                        key={s.title}
                        className="svc-reveal"
                        sx={{
                            bgcolor: '#ffffff',
                            borderRadius: 4,
                            p: { xs: 3.5, md: 4 },
                            boxShadow: 3,
                            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                            '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 },
                        }}
                    >
                        <Box
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                bgcolor: 'rgba(45,90,27,0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: GREEN_DARK,
                                mb: 2.5,
                                '& svg': { fontSize: 30 },
                            }}
                        >
                            {s.icon}
                        </Box>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 800, fontSize: '1.3rem', color: GREEN_DARK, mb: 1 }}>
                            {s.title}
                        </Typography>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.02rem', color: TEXT_DARK, opacity: 0.82, lineHeight: 1.6 }}>
                            {s.text}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box sx={{ px: 3, pb: { xs: 8, md: 12 } }}>
                <Box
                    className="svc-reveal"
                    sx={{
                        maxWidth: 1100,
                        mx: 'auto',
                        bgcolor: GREEN_DARK,
                        borderRadius: 4,
                        p: { xs: 4, md: 5 },
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 3,
                        textAlign: { xs: 'center', md: 'left' },
                        boxShadow: 3,
                    }}
                >
                    <Box>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.7rem' }, color: '#fff', mb: 0.75 }}>
                            Ready to get started?
                        </Typography>
                        <Typography sx={{ fontFamily: FONT, fontWeight: 500, fontSize: '1.02rem', color: 'rgba(255,255,255,0.85)', maxWidth: 560 }}>
                            Tell us what you need and we'll put together a quote that works for your business.
                        </Typography>
                    </Box>
                    <Box
                        component="img"
                        src={crateChar}
                        alt="AGA mascot carrying a crate of produce"
                        loading="lazy"
                        decoding="async"
                        sx={{
                            height: { xs: 120, md: 175 },
                            width: 'auto',
                            display: 'block',
                            flexShrink: 0,
                            filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.25))',
                        }}
                    />
                    <Button
                        component={RouterLink}
                        to="/contact"
                        disableElevation
                        sx={{ fontFamily: FONT, fontWeight: 800, textTransform: 'none', fontSize: '1.05rem', bgcolor: GOLD, color: '#1a2e0f', px: 4, py: 1.5, borderRadius: 2, whiteSpace: 'nowrap', flexShrink: 0, '&:hover': { bgcolor: '#b89640' } }}
                    >
                        Contact Us
                    </Button>
                </Box>
            </Box>
        </div>
    )
}

export default Services