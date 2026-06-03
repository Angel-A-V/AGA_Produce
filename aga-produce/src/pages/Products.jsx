import { useState, useRef, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import './Products.css'
import ProductCard from '../components/Productcard.jsx'
import ourProduce from '../assets/logo/our_produce.webp'
import chilesImg from '../assets/products/chiles.webp'
import onionsImg from '../assets/products/onions.webp'
import tomatoesImg from '../assets/products/tomatoes.webp'
import dryGrainsImg from '../assets/products/dry_grains.webp'
import leafyGreensImg from '../assets/products/leafy_greens.webp'
import citrusImg from '../assets/products/citrus.webp'
import crateChar from '../assets/products/crate_char.webp'

const GREEN_DARK = '#2d5a1b'
const GOLD = '#c9a84c'
const TEXT_DARK = '#3d3228'
const FONT = 'Nunito, sans-serif'

const categories = [
    {
        title: 'Chiles',
        image: chilesImg,
        items: ['Anaheim', 'Habanero', 'Jalapeño', 'Pasilla', 'Serrano'],
    },
    {
        title: 'Onions',
        image: onionsImg,
        items: ['Red', 'Brown / Yellow', 'White'],
    },
    {
        title: 'Tomatoes',
        image: tomatoesImg,
        items: ['Beefsteak', 'Milpero', 'Tomatillo', 'Roma'],
    },
    {
        title: 'Dry Grains',
        image: dryGrainsImg,
        items: [
            { name: 'Rice', tag: '50 lb bags' },
            { name: 'Beans', tag: '50 lb bags' },
            { name: 'Lentil', tag: '50 lb bags' },
        ],
    },
    {
        title: 'Leafy Greens',
        image: leafyGreensImg,
        items: [
            { name: 'Lettuce', tag: 'Cello / Romaine / Butter' },
            'Cabbage',
            { name: 'Cilantro', tag: '60ct / 30ct' },
        ],
    },
    {
        title: 'Citrus',
        image: citrusImg,
        items: ['Oranges', 'Grapefruit', 'Mandarin', 'Lemon', 'Limes'],
    },
]

function Products() {
    const [heroLoaded, setHeroLoaded] = useState(false)
    const heroRef = useRef(null)

    useEffect(() => {
        if (heroRef.current && heroRef.current.complete) {
            setHeroLoaded(true)
        }
    }, [])

    return (
        <div className="products">
            <section className="products-hero">
                <div className="products-hero-bg">
                    <img
                        ref={heroRef}
                        src={ourProduce}
                        alt="Fresh produce"
                        className={`products-hero-img fade-img ${heroLoaded ? 'is-loaded' : ''}`}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        onLoad={() => setHeroLoaded(true)}
                    />
                </div>
                <div className="products-hero-overlay">
                    <h1 className="products-hero-title">Our Products</h1>
                    <p className="products-hero-sub">
                        Fresh produce, usually in stock. Contact us for current availability.
                    </p>
                </div>
            </section>

            <section className="products-body">
                <Box sx={{ textAlign: 'center', px: 3, pt: { xs: 6, md: 9 } }}>
                    <Typography
                        sx={{
                            fontFamily: FONT,
                            fontWeight: 800,
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            fontSize: '0.8rem',
                            color: GOLD,
                            mb: 1.25,
                        }}
                    >
                        What We Carry
                    </Typography>
                    <Typography
                        component="h2"
                        sx={{
                            fontFamily: FONT,
                            fontWeight: 900,
                            fontSize: { xs: '1.9rem', md: '2.5rem' },
                            color: GREEN_DARK,
                            lineHeight: 1.1,
                        }}
                    >
                        Browse Our Categories
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: FONT,
                            fontWeight: 500,
                            fontSize: '1.05rem',
                            color: TEXT_DARK,
                            opacity: 0.75,
                            mt: 1.5,
                            maxWidth: 560,
                            mx: 'auto',
                        }}
                    >
                        Fresh produce sourced and delivered year-round.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: 4,
                        alignItems: 'start',
                        justifyItems: 'center',
                        maxWidth: 1040,
                        mx: 'auto',
                        px: 3,
                        pt: { xs: 4, md: 6 },
                        pb: { xs: 6, md: 8 },
                    }}
                >
                    {categories.map((cat) => (
                        <ProductCard
                            key={cat.title}
                            title={cat.title}
                            items={cat.items}
                            image={cat.image}
                        />
                    ))}
                </Box>

                <Box sx={{ px: 3, pb: { xs: 8, md: 11 } }}>
                    <Box
                        sx={{
                            maxWidth: 1040,
                            mx: 'auto',
                            bgcolor: GREEN_DARK,
                            borderRadius: 4,
                            p: { xs: 4, md: 5 },
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: { xs: 3, md: 2 },
                            textAlign: { xs: 'center', md: 'left' },
                            boxShadow: 3,
                        }}
                    >
                        <Box sx={{ flexShrink: 1 }}>
                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    fontWeight: 800,
                                    fontSize: { xs: '1.4rem', md: '1.7rem' },
                                    color: '#fff',
                                    mb: 0.75,
                                }}
                            >
                                Don't see what you're looking for?
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: FONT,
                                    fontWeight: 500,
                                    fontSize: '1.02rem',
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    maxWidth: 560,
                                }}
                            >
                                We source produce by request, reach out and we'll help you find it.
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
                            sx={{
                                fontFamily: FONT,
                                fontWeight: 800,
                                textTransform: 'none',
                                fontSize: '1.05rem',
                                bgcolor: GOLD,
                                color: '#1a2e0f',
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                                transition: 'transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease',
                                '&:hover': { bgcolor: '#b89640', transform: 'translateY(-3px)', boxShadow: '0 10px 22px rgba(0,0,0,0.28)' },
                            }}
                        >
                            Contact Us
                        </Button>
                    </Box>
                </Box>
            </section>
        </div>
    )
}

export default Products