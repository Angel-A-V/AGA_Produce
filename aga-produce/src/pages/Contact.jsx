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
import '../components/Buttons.css'
import contactHero from '../assets/contact/contact.webp'
import crateChar from '../assets/products/crate_char.webp'

const GREEN_DARK = '#2d5a1b'
const GOLD = '#c9a84c'
const TEXT_DARK = '#3d3228'
const FONT = 'Nunito, sans-serif'

const CONTACT_EMAIL = 'Agaproinfo1@gmail.com'
const PHONES = ['TEL: (323) 477-1177', 'FAX: (323) 477-1177']
const IG_HANDLE = 'aga_producecompanyinc'
const ADDRESS = '1146 S Vail Ave, Montebello, CA 90640'

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

const IconMail = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 6 10-6" />
    </svg>
)

const IconShield = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" width="24" height="24" aria-hidden="true">
        <path d="M12 2 4 5.5v5c0 5.2 3.4 9.8 8 11.5 4.6-1.7 8-6.3 8-11.5v-5z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
)

const IconStore = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" width="24" height="24" aria-hidden="true">
        <path d="M3 9h18l-1.5-5h-15z" />
        <path d="M4 9v11h16V9" />
        <path d="M9 20v-6h6v6" />
    </svg>
)

const IconLeaf = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" width="24" height="24" aria-hidden="true">
        <path d="M12 2 4 5.5v5c0 5.2 3.4 9.8 8 11.5 4.6-1.7 8-6.3 8-11.5v-5z" />
        <path d="M12 8v5" />
        <path d="M9.5 10.5h5" />
    </svg>
)

function Contact() {
    const pageRef = useRef(null)
    const heroRef = useRef(null)

    const [heroLoaded, setHeroLoaded] = useState(false)
    const [openIndex, setOpenIndex] = useState(null)
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
    const [pickerOpen, setPickerOpen] = useState(false)
    const [copied, setCopied] = useState(false)

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

    // Close the mail picker on Escape
    useEffect(() => {
        if (!pickerOpen) return
        const onKey = (e) => {
            if (e.key === 'Escape') closePicker()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [pickerOpen])

    const toggleFaq = (i) => setOpenIndex((prev) => (prev === i ? null : i))

    const handleChange = (field) => (e) =>
        setForm((f) => ({ ...f, [field]: e.target.value }))

    // Raw (unencoded) pieces — used for the clipboard fallback
    const rawSubject = `Website inquiry from ${form.name || 'a customer'}`
    const rawBody =
        `Name: ${form.name}\n` +
        `Email: ${form.email}\n` +
        `Phone: ${form.phone}\n\n` +
        `${form.message}`

    const subject = encodeURIComponent(rawSubject)
    const body = encodeURIComponent(rawBody)
    const to = encodeURIComponent(CONTACT_EMAIL)

    // Web-based compose URLs, so people who read mail in the browser
    // aren't dumped into a desktop mail app they may not have set up.
    const mailProviders = [
        {
            id: 'gmail',
            name: 'Gmail',
            url: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
        },
        {
            id: 'outlook',
            name: 'Outlook',
            url: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}&body=${body}`,
        },
        {
            id: 'yahoo',
            name: 'Yahoo Mail',
            url: `https://compose.mail.yahoo.com/?to=${to}&subject=${subject}&body=${body}`,
        },
        {
            id: 'default',
            name: 'My default mail app',
            url: `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`,
        },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setCopied(false)
        setPickerOpen(true)
    }

    const closePicker = () => {
        setPickerOpen(false)
        setCopied(false)
    }

    const openProvider = (provider) => {
        if (provider.id === 'default') {
            // mailto: must be a same-tab navigation to trigger the OS handler
            window.location.href = provider.url
        } else {
            window.open(provider.url, '_blank', 'noopener,noreferrer')
        }
        setPickerOpen(false)
    }

    const copyToClipboard = async () => {
        const text = `To: ${CONTACT_EMAIL}\nSubject: ${rawSubject}\n\n${rawBody}`
        try {
            await navigator.clipboard.writeText(text)
        } catch {
            // clipboard API can be blocked (e.g. insecure origin) — fall back
            const ta = document.createElement('textarea')
            ta.value = text
            ta.setAttribute('readonly', '')
            ta.style.position = 'absolute'
            ta.style.left = '-9999px'
            document.body.appendChild(ta)
            ta.select()
            document.execCommand('copy')
            document.body.removeChild(ta)
        }
        setCopied(true)
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
                    <Box className="contact-info-card contact-reveal">
                        <Typography className="contact-info-title">Reach us directly</Typography>

                        {PHONES.map((p) => {
                            const digits = p.replace(/[^0-9]/g, '')
                            const isFax = /fax/i.test(p)
                            const inner = (
                                <>
                                    <PhoneIcon fontSize="small" />
                                    <span>{p}</span>
                                </>
                            )
                            return isFax ? (
                                <div className="contact-info-row is-static" key={p}>{inner}</div>
                            ) : (
                                <a className="contact-info-row" href={`tel:${digits}`} key={p}>{inner}</a>
                            )
                        })}

                        <a className="contact-info-row" href={`mailto:${CONTACT_EMAIL}`}>
                            <IconMail />
                            <span>{CONTACT_EMAIL}</span>
                        </a>

                        <a
                            className="contact-info-row"
                            href={`https://instagram.com/${IG_HANDLE}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <InstagramIcon fontSize="small" />
                            <span>@{IG_HANDLE}</span>
                        </a>

                        <a
                            className="contact-info-row"
                            href={mapLinkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <PlaceIcon fontSize="small" />
                            <span>{ADDRESS}</span>
                        </a>

                        <div className="contact-map">
                            <iframe
                                title="AGA Produce Company location"
                                src={mapEmbedUrl}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <a
                            className="contact-map-link"
                            href={mapLinkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on Google Maps →
                        </a>
                    </Box>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        className="contact-form-card contact-reveal"
                    >
                        <Typography className="contact-form-title">Send us a message</Typography>
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
                            className="aga-btn aga-btn--gold"
                            sx={{ alignSelf: 'flex-start' }}
                        >
                            Send Message
                        </Button>

                    </Box>
                </Box>
                <Box className="contact-mascot-strip contact-reveal" sx={{ maxWidth: 1100, mx: 'auto', px: 3 }}>
                    <Box
                        component="img"
                        src={crateChar}
                        alt="AGA mascot carrying a crate of produce"
                        className="contact-mascot-img"
                        loading="lazy"
                        decoding="async"
                    />
                    <Typography className="contact-mascot-text">
                        Family-run and <b>fresh-obsessed,</b> our team is on the other end of every call, ready to help set up your account.
                    </Typography>
                </Box>

                <Box
                    className="contact-reveal"
                    sx={{ maxWidth: 1280, mx: 'auto', px: 3, pb: { xs: 8, md: 12 } }}
                >
                    <div className="contact-hours-band">
                        <div className="hour-card">
                            <AccessTimeIcon />
                            <p className="hour-label">Mon – Fri</p>
                            <p className="hour-val">1:00 AM – 3:00 PM</p>
                        </div>
                        <div className="hour-card">
                            <AccessTimeIcon />
                            <p className="hour-label">Saturday</p>
                            <p className="hour-val">1:00 AM – 10:00 AM</p>
                        </div>
                        <div className="hour-card">
                            <IconShield />
                            <p className="hour-label">Safety Guaranteed</p>
                            <p className="hour-val">Cold-chain, every order</p>
                        </div>
                        <div className="hour-card">
                            <IconStore />
                            <p className="hour-label">Wholesale Only</p>
                            <p className="hour-val">Restaurants &amp; markets</p>
                        </div>
                        <div className="hour-card">
                            <IconLeaf />
                            <p className="hour-label">Organic Certified</p>
                            <p className="hour-val">Selected products</p>
                        </div>
                    </div>
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

            {pickerOpen && (
                <div
                    className="mail-picker-backdrop"
                    onClick={closePicker}
                    role="presentation"
                >
                    <div
                        className="mail-picker"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="mail-picker-title"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="mail-picker-close"
                            onClick={closePicker}
                            aria-label="Close"
                        >
                            &times;
                        </button>

                        <h3 id="mail-picker-title" className="mail-picker-title">
                            Where would you like to send from?
                        </h3>
                        <p className="mail-picker-sub">
                            We&apos;ll open your message, pre-filled and addressed to us. Just hit send.
                        </p>

                        <div className="mail-picker-options">
                            {mailProviders.map((p) => (
                                <button
                                    type="button"
                                    key={p.id}
                                    className="mail-picker-option"
                                    onClick={() => openProvider(p)}
                                >
                                    <span>{p.name}</span>
                                    <span className="mail-picker-arrow" aria-hidden="true">&rarr;</span>
                                </button>
                            ))}
                        </div>

                        <div className="mail-picker-divider"><span>or</span></div>

                        <button
                            type="button"
                            className="mail-picker-copy"
                            onClick={copyToClipboard}
                        >
                            {copied ? 'Copied to clipboard' : 'Copy message instead'}
                        </button>

                        {copied && (
                            <p className="mail-picker-copied">
                                Paste it into any email addressed to <b>{CONTACT_EMAIL}</b>.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Contact