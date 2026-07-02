import { useState, useRef, useEffect } from 'react'
import { animate, stagger } from 'animejs'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import PhoneIcon from '@mui/icons-material/Phone'
import InstagramIcon from '@mui/icons-material/Instagram'
import PlaceIcon from '@mui/icons-material/Place'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SendIcon from '@mui/icons-material/Send'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import './Contact.css'
import contactHero from '../assets/contact/contact.webp'

const GREEN_DARK = '#2d5a1b'
const GOLD = '#c9a84c'
const TEXT_DARK = '#3d3228'
const FONT = 'Nunito, sans-serif'

const CONTACT_EMAIL = 'Agaproinfo1@gmail.com'
const PHONES = ['TEL: (323) 477-1177', 'FAX: (323) 477-1177']
const IG_HANDLE = 'aga_producecompanyinc'
const ADDRESS = '1146 S Vail Ave, Montebello, CA 90640'
const HOURS = 'Mon - Fri: 1:00 AM - 3:00 PM Sat: 1:00 AM - 10:00 AM'

const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`
const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`

const FAQS = [
    {
        q: 'Do you deliver?',
        a: 'Yes, we offer both local transportation across the greater Los Angeles area and out-of-state delivery. Reach out with your location and order size, and we will confirm a delivery window that works for you.',
    },
    {
        q: 'Is there a minimum order?',
        a: 'Minimums vary by product and delivery zone. Most wholesale accounts have a small per-delivery minimum. Contact us and we will walk you through what applies to your business.',
    },
    {
        q: 'How do I set up a wholesale account?',
        a: 'Give us a call or send a message through this page with your business name and what you are looking to source. We will get you set up and quoting within a day.',
    },
    {
        q: 'Can you source produce you do not normally stock?',
        a: 'Often, yes. We source by request through our supplier network. Tell us what you need and we will let you know availability and pricing.',
    },
    {
        q: 'Do you sell to the public?',
        a: 'We are primarily a wholesale distributor serving restaurants, markets, and food businesses. Reach out and we will point you in the right direction.',
    },
]

function Contact() {
    const pageRef = useRef(null)
    const heroRef = useRef(null)

    const [heroLoaded, setHeroLoaded] = useState(false)
    const [openIndex, setOpenIndex] = useState(null)
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
    const [sent, setSent] = useState(false)

    useEffect(() => {
        if (heroRef.current && heroRef.current.complete) setHeroLoaded(true)
    }, [])

    useEffect(() => {
        if (pageRef.current) {
            animate(pageRef.current.querySelectorAll('.contact-reveal'), {
                opacity: [0, 1],
                translateY: [22, 0],
                delay: stagger(90),
                duration: 650,
                ease: 'out(3)',
            })
        }
    }, [])

    const toggleFaq = (i) => setOpenIndex((prev) => (prev === i ? null : i))

    const handleChange = (field) => (e) =>
        setForm((f) => ({ ...f, [field]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        const subject = encodeURIComponent(`Website inquiry from ${form.name || 'a customer'}`)
        const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
        )
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
        setSent(true)
    }

    const fieldSx = {
        '& .MuiOutlinedInput-root': {
            fontFamily: FONT,
            '& fieldset': { borderColor: 'rgba(45,90,27,0.25)' },
            '&:hover fieldset': { borderColor: GREEN_DARK },
            '&.Mui-focused fieldset': { borderColor: GREEN_DARK },
        },
        '& label.Mui-focused': { color: GREEN_DARK },
        '& label': { fontFamily: FONT },
    }

    return (
        <div className="contact-page" ref={pageRef}>
            <section className="contact-hero">
                <div className="contact-hero-bg">
                    <img
                        ref={heroRef}
                        src={contactHero}
                        alt="AGA Produce Company delivery fleet outside the warehouse"
                        className={`contact-hero-img fade-img ${heroLoaded ? 'is-loaded' : ''}`}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        onLoad={() => setHeroLoaded(true)}
                    />
                </div>
                <div className="contact-hero-overlay">
                    <p className="contact-hero-eyebrow">Get In Touch</p>
                    <h1 className="contact-hero-title">Contact Us</h1>
                    <p className="contact-hero-sub">
                        Questions, orders, or sourcing requests, we'd love to hear from you.
                    </p>
                </div>
            </section>

            <section className="contact-body">
                <Box
                    sx={{
                        maxWidth: 1100,
                        mx: 'auto',
                        px: 3,
                        pt: { xs: 6, md: 9 },
                        pb: { xs: 6, md: 9 },
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '0.85fr 1.15fr' },
                        gap: { xs: 4, md: 5 },
                        alignItems: 'start',
                    }}
                >
                    <Box
                        className="contact-reveal"
                        sx={{ bgcolor: GREEN_DARK, borderRadius: 4, p: { xs: 3.5, md: 4 }, boxShadow: 3 }}
                    >
                        <Typography sx={{ fontFamily: FONT, fontWeight: 900, fontSize: '1.4rem', color: '#fff', mb: 3 }}>
                            Reach us directly
                        </Typography>

                        {PHONES.map((p) => {
                            const digits = p.replace(/[^0-9]/g, '')
                            const isFax = /fax/i.test(p)
                            const inner = (
                                <>
                                    <PhoneIcon fontSize="small" />
                                    <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: '1.05rem' }}>{p}</Typography>
                                </>
                            )
                            return isFax ? (
                                <Box key={p} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, color: 'rgba(255,255,255,0.92)' }}>
                                    {inner}
                                </Box>
                            ) : (
                                <Box
                                    key={p}
                                    component="a"
                                    href={`tel:${digits}`}
                                    sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, color: '#fff', textDecoration: 'none', '&:hover': { color: GOLD } }}
                                >
                                    {inner}
                                </Box>
                            )
                        })}

                        <Box
                            component="a"
                            href={`https://instagram.com/${IG_HANDLE}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, color: '#fff', textDecoration: 'none', '&:hover': { color: GOLD } }}
                        >
                            <InstagramIcon fontSize="small" />
                            <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: '1.05rem' }}>@{IG_HANDLE}</Typography>
                        </Box>

                        <Box
                            component="a"
                            href={mapLinkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2, color: 'rgba(255,255,255,0.92)', textDecoration: 'none', '&:hover': { color: GOLD } }}
                        >
                            <PlaceIcon fontSize="small" />
                            <Typography sx={{ fontFamily: FONT, fontWeight: 600, fontSize: '1rem' }}>{ADDRESS}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, color: 'rgba(255,255,255,0.92)' }}>
                            <AccessTimeIcon fontSize="small" sx={{ mt: 0.5 }} />
                            <Typography sx={{ fontFamily: FONT, fontWeight: 600, fontSize: '1rem', whiteSpace: 'pre-line'}}>{HOURS.replace(' Sat:', '\nSat:')}</Typography>
                        </Box>

                        <Box className="contact-map">
                            <iframe
                                title="AGA Produce Company location"
                                src={mapEmbedUrl}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </Box>
                        <Box
                            component="a"
                            href={mapLinkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ display: 'inline-block', mt: 1.5, fontFamily: FONT, fontWeight: 800, fontSize: '0.95rem', color: GOLD, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                        >
                            View on Google Maps
                        </Box>
                    </Box>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        className="contact-reveal"
                        sx={{ bgcolor: '#ffffff', borderRadius: 4, p: { xs: 3.5, md: 4 }, boxShadow: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}
                    >
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
                            <TextField label="Name" value={form.name} onChange={handleChange('name')} required fullWidth sx={fieldSx} />
                            <TextField label="Email" type="email" value={form.email} onChange={handleChange('email')} required fullWidth sx={fieldSx} />
                        </Box>
                        <TextField label="Phone (optional)" value={form.phone} onChange={handleChange('phone')} fullWidth sx={fieldSx} />
                        <TextField label="Message" value={form.message} onChange={handleChange('message')} required fullWidth multiline minRows={4} sx={fieldSx} />

                        <Button
                            type="submit"
                            endIcon={<SendIcon />}
                            disableElevation
                            sx={{ alignSelf: 'flex-start', fontFamily: FONT, fontWeight: 800, textTransform: 'none', fontSize: '1.05rem', bgcolor: GOLD, color: '#1a2e0f', px: 4, py: 1.4, borderRadius: 2, '&:hover': { bgcolor: '#b89640' } }}
                        >
                            Send Message
                        </Button>

                        {sent && (
                            <Typography sx={{ fontFamily: FONT, fontWeight: 700, color: GREEN_DARK, fontSize: '0.98rem' }}>
                                Thanks! Your email app should have opened with your message ready to send.
                            </Typography>
                        )}
                    </Box>
                </Box>
                <Box className="faq-section-wrapper" sx={{bgcolor: '#E7DECE', width: '100%', py: { xs: 8, md: 12 } }}>
                    <Box  sx={{ maxWidth: 760, mx: 'auto', px: 3 }}>
                        <Typography
                            component="h3"
                            className="contact-reveal"
                            sx={{ fontFamily: FONT, fontWeight: 900, fontSize: { xs: '1.6rem', md: '2rem' }, color: GREEN_DARK, textAlign: 'center', mb: 4 }}
                        >
                            Frequently Asked
                        </Typography>

                        <div className="faq-list">
                            {FAQS.map((item, i) => {
                                const open = openIndex === i
                                return (
                                    <div className={`faq-item ${open ? 'open' : ''}`} key={item.q}>
                                        <button
                                            type="button"
                                            className="faq-question"
                                            onClick={() => toggleFaq(i)}
                                            aria-expanded={open}
                                        >
                                            <span>{item.q}</span>
                                            <KeyboardArrowDownIcon className={`faq-chevron ${open ? 'open' : ''}`} />
                                        </button>
                                        <div className={`faq-answer-wrap ${open ? 'open' : ''}`}>
                                            <div className="faq-answer-inner">{item.a}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Box>
                </Box>
            </section>
        </div>
    )
}

export default Contact