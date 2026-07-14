import { useState, useRef, useEffect, useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import './Products.css'
import ProductCard from '../components/Productcard.jsx'
import CtaBanner from '../components/CtaBanner'
import ourProduce from '../assets/logo/our_produce.webp'
import chilesImg from '../assets/products/chiles.webp'
import onionsImg from '../assets/products/onions.webp'
import tomatoesImg from '../assets/products/tomatoes.webp'
import dryGrainsImg from '../assets/products/dry_grains.webp'
import leafyGreensImg from '../assets/products/leafy_greens.webp'
import citrusImg from '../assets/products/citrus.webp'

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

/* Returns the item's display name whether it's a plain string
   or an object like { name, tag }. */
const itemName = (item) => (typeof item === 'string' ? item : item.name)

function Products() {
    const [heroLoaded, setHeroLoaded] = useState(false)
    const [query, setQuery] = useState('')
    const heroRef = useRef(null)

    /* Live search: matches category titles AND individual items.
       - If the query matches a category title, the whole card shows.
       - Otherwise the card shows with only its matching items.
       Recomputed only when the query changes. */
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return categories

        return categories
            .map((cat) => {
                if (cat.title.toLowerCase().includes(q)) return cat
                const items = cat.items.filter((it) =>
                    itemName(it).toLowerCase().includes(q)
                )
                return items.length ? { ...cat, items } : null
            })
            .filter(Boolean)
    }, [query])

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

                <Box sx={{ maxWidth: 520, mx: 'auto', px: 3, pt: { xs: 3.5, md: 5 } }}>
                    <div className="product-search">
                        <svg
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            width="20" height="20" aria-hidden="true"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search produce… e.g. jalapeño, citrus, rice"
                            aria-label="Search products"
                        />
                        {query && (
                            <button
                                type="button"
                                className="product-search-clear"
                                onClick={() => setQuery('')}
                                aria-label="Clear search"
                            >
                                &times;
                            </button>
                        )}
                    </div>
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
                    {filtered.map((cat) => (
                        <ProductCard
                            key={cat.title}
                            title={cat.title}
                            items={cat.items}
                            image={cat.image}
                        />
                    ))}
                </Box>

                {filtered.length === 0 && (
                    <Box sx={{ textAlign: 'center', px: 3, pb: { xs: 6, md: 8 } }}>
                        <Typography
                            sx={{
                                fontFamily: FONT,
                                fontWeight: 800,
                                fontSize: '1.15rem',
                                color: GREEN_DARK,
                                mb: 0.75,
                            }}
                        >
                            No matches for &ldquo;{query}&rdquo;
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: FONT,
                                fontWeight: 500,
                                fontSize: '0.98rem',
                                color: TEXT_DARK,
                                opacity: 0.75,
                            }}
                        >
                            We source by request — ask us about it below.
                        </Typography>
                    </Box>
                )}
            </section>

            <CtaBanner
                title="Don't see what you're looking for?"
                subtitle="We source produce by request, reach out and we'll help you find it."
            />
        </div>
    )
}

export default Products