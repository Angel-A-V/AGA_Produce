import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react'
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
import { useLanguage } from '../i18n/useLanguage'

const GREEN_DARK = '#2d5a1b'
const FONT = 'Nunito, sans-serif'

const CONTACT_EMAIL = 'Agaproinfo1@gmail.com'
const PHONES = ['TEL: (323) 477-1177', 'FAX: (323) 477-1177']
const IG_HANDLE = 'aga_producecompanyinc'
const ADDRESS = '1146 S Vail Ave, Montebello, CA 90640'

const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=15&output=embed`
const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`

/* Inline SVGs — avoids depending on icon names that may not exist
   in this @mui/icons-material install. */
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

/* Defined once at module scope. Previously these were object literals
   inside the component, so every keystroke produced brand-new `sx`
   objects and forced MUI/Emotion to re-serialize the styles for every
   field — the single biggest cause of the typing lag. */
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

const nameRowSx = {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
    gap: 2.5,
}

const submitBtnSx = { alignSelf: 'flex-start' }

/* The form owns its own state. Because it's a separate component,
   typing re-renders ONLY the form — not the hero, the Google Maps
   iframe, the hour cards, or the FAQ list, all of which used to
   re-render on every single keypress. */
const ContactForm = memo(function ContactForm({ onSend, labels }) {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

    const handleChange = useCallback(
        (field) => (e) => {
            const { value } = e.target
            setForm((f) => ({ ...f, [field]: value }))
        },
        []
    )

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault()
            onSend(form)
        },
        [form, onSend]
    )

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="contact-form-card contact-reveal"
        >
            <Typography className="contact-form-title">{labels.formTitle}</Typography>
            <Box sx={nameRowSx}>
                <TextField label={labels.nameLabel} value={form.name} onChange={handleChange('name')} required fullWidth sx={fieldSx} />
                <TextField label={labels.emailLabel} type="email" value={form.email} onChange={handleChange('email')} required fullWidth sx={fieldSx} />
            </Box>
            <TextField label={labels.phoneLabel} value={form.phone} onChange={handleChange('phone')} fullWidth sx={fieldSx} />
            <TextField label={labels.messageLabel} value={form.message} onChange={handleChange('message')} required fullWidth multiline minRows={4} sx={fieldSx} />

            <Button
                type="submit"
                endIcon={<SendIcon />}
                disableElevation
                className="aga-btn aga-btn--gold"
                sx={submitBtnSx}
            >
                {labels.sendButton}
            </Button>
        </Box>
    )
})

function Contact() {
    const pageRef = useRef(null)
    const heroRef = useRef(null)
    const { t } = useLanguage()

    const [heroLoaded, setHeroLoaded] = useState(false)
    const [openIndex, setOpenIndex] = useState(null)
    const [submitted, setSubmitted] = useState(null)
    const [pickerOpen, setPickerOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    const hours = t('contact.hours')
    const faqs = t('contact.faqs')

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

    // Links are built ONLY when the form is submitted, from the snapshot
    // below — not recomputed (and re-encoded) on every keystroke.
    const mailProviders = useMemo(() => {
        if (!submitted) return []

        const rawSubject = t('contact.subjectPrefix')(submitted.name || 'a customer')
        const rawBody =
            `Name: ${submitted.name}\n` +
            `Email: ${submitted.email}\n` +
            `Phone: ${submitted.phone}\n\n` +
            `${submitted.message}`

        const subject = encodeURIComponent(rawSubject)
        const body = encodeURIComponent(rawBody)
        const to = encodeURIComponent(CONTACT_EMAIL)

        return [
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitted])

    // Stable identity so the memoized <ContactForm /> never re-renders
    // just because the parent did.
    const handleSend = useCallback((formData) => {
        setSubmitted(formData)
        setCopied(false)
        setPickerOpen(true)
    }, [])

    const closePicker = useCallback(() => {
        setPickerOpen(false)
        setCopied(false)
    }, [])

    // Close the mail picker on Escape.
    // Placed after closePicker so it isn't referenced before definition,
    // and closePicker is in the dep array (it's useCallback-stable).
    useEffect(() => {
        if (!pickerOpen) return
        const onKey = (e) => {
            if (e.key === 'Escape') closePicker()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [pickerOpen, closePicker])

    const openProvider = useCallback((provider) => {
        if (provider.id === 'default') {
            // mailto: must be a same-tab navigation to trigger the OS handler
            window.location.href = provider.url
        } else {
            window.open(provider.url, '_blank', 'noopener,noreferrer')
        }
        setPickerOpen(false)
    }, [])

    const copyToClipboard = useCallback(async () => {
        if (!submitted) return
        const rawSubject = t('contact.subjectPrefix')(submitted.name || 'a customer')
        const rawBody =
            `Name: ${submitted.name}\n` +
            `Email: ${submitted.email}\n` +
            `Phone: ${submitted.phone}\n\n` +
            `${submitted.message}`
        const text = `To: ${CONTACT_EMAIL}\nSubject: ${rawSubject}\n\n${rawBody}`

        try {
            await navigator.clipboard.writeText(text)
        } catch {
            // Clipboard API is blocked on insecure origins — fall back
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitted])

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
                    <p className="contact-hero-eyebrow">{t('contact.heroEyebrow')}</p>
                    <h1 className="contact-hero-title">{t('contact.heroTitle')}</h1>
                    <p className="contact-hero-sub">{t('contact.heroSub')}</p>
                </div>
            </section>

            <section className="contact-body">
                <Box className="contact-mascot-strip contact-reveal" sx={{ maxWidth: 1100, mx: 'auto', px: 3, pt: { xs: 5, md: 7 } }}>
                    <Box
                        component="img"
                        src={crateChar}
                        alt="AGA mascot carrying a crate of produce"
                        className="contact-mascot-img"
                        loading="lazy"
                        decoding="async"
                    />
                    <Typography className="contact-mascot-text">
                        {t('contact.mascotPre')}<b>{t('contact.mascotBold')}</b>{t('contact.mascotPost')}
                    </Typography>
                </Box>

                <Box
                    className="contact-reveal"
                    sx={{ maxWidth: 1280, mx: 'auto', px: 3, pb: { xs: 2, md: 3 } }}
                >
                    <div className="contact-hours-band">
                        <div className="hour-card">
                            <AccessTimeIcon />
                            <p className="hour-label">{hours.monFri}</p>
                            <p className="hour-val">{hours.monFriVal}</p>
                        </div>
                        <div className="hour-card">
                            <AccessTimeIcon />
                            <p className="hour-label">{hours.saturday}</p>
                            <p className="hour-val">{hours.saturdayVal}</p>
                        </div>
                        <div className="hour-card">
                            <IconShield />
                            <p className="hour-label">{hours.safetyGuaranteed}</p>
                            <p className="hour-val">{hours.safetyGuaranteedVal}</p>
                        </div>
                        <div className="hour-card">
                            <IconStore />
                            <p className="hour-label">{hours.wholesaleOnly}</p>
                            <p className="hour-val">{hours.wholesaleOnlyVal}</p>
                        </div>
                        <div className="hour-card">
                            <IconLeaf />
                            <p className="hour-label">{hours.organicCertified}</p>
                            <p className="hour-val">{hours.organicCertifiedVal}</p>
                        </div>
                    </div>
                </Box>

                <Box
                    sx={{
                        maxWidth: 1100,
                        mx: 'auto',
                        px: 3,
                        pt: { xs: 4, md: 6 },
                        pb: { xs: 10, md: 14 },
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '0.85fr 1.15fr' },
                        gap: { xs: 4, md: 5 },
                        alignItems: 'start',
                    }}
                >
                    <Box className="contact-info-card contact-reveal">
                        <Typography className="contact-info-title">{t('contact.reachUsTitle')}</Typography>

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
                            {/* Fallback sits UNDER the iframe. If the embed loads,
                                map tiles cover it; if it's ever blocked, the user
                                sees a clean clickable card instead of a blank box. */}
                            <a
                                className="contact-map-fallback"
                                href={mapLinkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <PlaceIcon />
                                <span>{t('contact.openMap')}</span>
                            </a>
                            <iframe
                                title="AGA Produce Company location"
                                src={mapEmbedUrl}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <a
                            className="contact-map-link"
                            href={mapLinkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t('contact.viewOnMaps')}
                        </a>
                    </Box>

                    <ContactForm
                        onSend={handleSend}
                        labels={{
                            formTitle: t('contact.formTitle'),
                            nameLabel: t('contact.nameLabel'),
                            emailLabel: t('contact.emailLabel'),
                            phoneLabel: t('contact.phoneLabel'),
                            messageLabel: t('contact.messageLabel'),
                            sendButton: t('contact.sendButton'),
                        }}
                    />
                </Box>
                <Box className="faq-section-wrapper" sx={{ width: '100%', py: { xs: 8, md: 12 } }}>
                    <Box  sx={{ maxWidth: 760, mx: 'auto', px: 3 }}>
                        <Typography
                            component="h3"
                            className="contact-reveal"
                            sx={{ fontFamily: FONT, fontWeight: 900, fontSize: { xs: '1.6rem', md: '2rem' }, color: GREEN_DARK, textAlign: 'center', mb: 4 }}
                        >
                            {t('contact.faqTitle')}
                        </Typography>

                        <div className="faq-list">
                            {faqs.map((item, i) => {
                                const open = openIndex === i
                                return (
                                    <div className={`faq-item ${open ? 'open' : ''}`} key={i}>
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
                            aria-label={t('contact.close')}
                        >
                            &times;
                        </button>

                        <h3 id="mail-picker-title" className="mail-picker-title">
                            {t('contact.mailPickerTitle')}
                        </h3>
                        <p className="mail-picker-sub">
                            {t('contact.mailPickerSub')}
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

                        <div className="mail-picker-divider"><span>{t('contact.or')}</span></div>

                        <button
                            type="button"
                            className="mail-picker-copy"
                            onClick={copyToClipboard}
                        >
                            {copied ? t('contact.copied') : t('contact.copyInstead')}
                        </button>

                        {copied && (
                            <p className="mail-picker-copied">
                                {t('contact.copiedNote')(CONTACT_EMAIL)}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Contact
