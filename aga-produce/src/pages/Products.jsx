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
import { useLanguage } from '../i18n/useLanguage'

const GREEN_DARK = '#2d5a1b'
/* Darker gold step than the brand's #c9a84c accent — this one is used
   for eyebrow text on light backgrounds, where #c9a84c fails 4.5:1. */
const EYEBROW_GOLD = '#71591c'
const TEXT_DARK = '#3d3228'
const FONT = 'Nunito, sans-serif'

const categoryImages = [chilesImg, onionsImg, tomatoesImg, dryGrainsImg, leafyGreensImg, citrusImg]

/* Returns the item's display name whether it's a plain string
   or an object like { name, tag }. */
const itemName = (item) => (typeof item === 'string' ? item : item.name)

function Products() {
    const { t } = useLanguage()
    const [heroLoaded, setHeroLoaded] = useState(false)
    const [query, setQuery] = useState('')
    const heroRef = useRef(null)

    const categories = t('products.categories').map((cat, i) => ({ ...cat, image: categoryImages[i] }))

    /* Live search: matches category titles AND individual items.
       - If the query matches a category title, the whole card shows.
       - Otherwise the card shows with only its matching items.
       Recomputed only when the query or language changes. */
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, categories])

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
                    <h1 className="products-hero-title">{t('products.heroTitle')}</h1>
                    <p className="products-hero-sub">{t('products.heroSub')}</p>
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
                            color: EYEBROW_GOLD,
                            mb: 1.25,
                        }}
                    >
                        {t('products.eyebrow')}
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
                        {t('products.title')}
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
                        {t('products.sub')}
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
                            placeholder={t('products.searchPlaceholder')}
                            aria-label={t('products.searchAriaLabel')}
                        />
                        {query && (
                            <button
                                type="button"
                                className="product-search-clear"
                                onClick={() => setQuery('')}
                                aria-label={t('products.clearAriaLabel')}
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
                            key={cat.id}
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
                            {t('products.noMatchesTitle')(query)}
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
                            {t('products.noMatchesSub')}
                        </Typography>
                    </Box>
                )}
            </section>

            <CtaBanner
                title={t('products.ctaTitle')}
                subtitle={t('products.ctaSubtitle')}
            />
        </div>
    )
}

export default Products
