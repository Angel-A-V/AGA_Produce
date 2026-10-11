import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './Contact.css'
import { useCopy } from '../i18n/useCopy'
import { contactCopy } from './Contact.copy'
import { sharedCopy } from '../components/shared.copy'
import { PHONE, PHONE_HREF, EMAIL, ADDRESS_LINE1, ADDRESS_LINE2, IG_URL, IG_HANDLE } from '../siteInfo'
import { useParallax } from '../hooks/useAgaMotion'

import heroImg from '../assets/contact/contact.webp'
import mascot from '../assets/products/crate_char.webp'
import primusgfs from '../assets/certifications/primusgfs.webp'
import usda from '../assets/certifications/usda.webp'
import pco from '../assets/certifications/pco.webp'
import ifco from '../assets/certifications/ifco.webp'

const CERT_LOGOS = [primusgfs, usda, pco, ifco]
const MAP_Q = '1146%20S%20Vail%20Ave%2C%20Montebello%2C%20CA%2090640'

function Contact() {
    const c = useCopy(contactCopy)
    const shared = useCopy(sharedCopy)
    const heroRef = useParallax(0.3, 700)
    const [form, setForm] = useState({ name: '', business: '', phone: '', email: '', message: '' })
    const [submitted, setSubmitted] = useState(null)
    const [pickerOpen, setPickerOpen] = useState(false)
    const [copied, setCopied] = useState(false)
    const dialogRef = useRef(null)
    const sendRef = useRef(null)

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

    const draft = useMemo(() => {
        if (!submitted) return null
        const subject = c.subjectPrefix(submitted.business || submitted.name || 'a customer')
        const body =
            `${c.fName}: ${submitted.name}\n` +
            `${c.fBusiness}: ${submitted.business}\n` +
            `${c.fPhone}: ${submitted.phone}\n` +
            `${c.fEmail}: ${submitted.email}\n\n` +
            `${submitted.message}\n`
        return { subject, body }
    }, [submitted, c])

    const providers = useMemo(() => {
        if (!draft) return []
        const to = encodeURIComponent(EMAIL)
        const su = encodeURIComponent(draft.subject)
        const bo = encodeURIComponent(draft.body)
        return [
            { id: 'gmail', name: 'Gmail', url: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${bo}` },
            { id: 'outlook', name: 'Outlook', url: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${su}&body=${bo}` },
            { id: 'yahoo', name: 'Yahoo Mail', url: `https://compose.mail.yahoo.com/?to=${to}&subject=${su}&body=${bo}` },
            { id: 'default', name: c.providerDefault, url: `mailto:${EMAIL}?subject=${su}&body=${bo}` },
        ]
    }, [draft, c])

    const onSubmit = (e) => {
        e.preventDefault()
        setSubmitted(form)
        setCopied(false)
        setPickerOpen(true)
    }

    const closePicker = useCallback(() => {
        setPickerOpen(false)
        setCopied(false)
        if (sendRef.current) sendRef.current.focus()
    }, [])

    useEffect(() => {
        if (!pickerOpen) return
        if (dialogRef.current) dialogRef.current.focus()
        const onKey = (e) => { if (e.key === 'Escape') closePicker() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [pickerOpen, closePicker])

    const openProvider = (p) => () => {
        if (p.id === 'default') {
            window.location.href = p.url
        } else {
            window.open(p.url, '_blank', 'noopener,noreferrer')
        }
        setPickerOpen(false)
    }

    const copyDraft = async () => {
        if (!draft) return
        const text = `To: ${EMAIL}\nSubject: ${draft.subject}\n\n${draft.body}`
        try {
            await navigator.clipboard.writeText(text)
        } catch {
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

    return (
        <div className="aga-contact">
            <section className="aga-contact-hero">
                <div className="aga-contact-hero-img">
                    <img ref={heroRef} src={heroImg} alt={c.altHero} />
                    <div className="aga-contact-hero-scrim" />
                </div>
                <div className="aga-contact-hero-grid aga-pad">
                    <div className="aga-contact-hero-text">
                        <h1 className="aga-h1 aga-contact-h1">{c.title}</h1>
                        <span className="aga-stamp aga-stamp--brass">{c.stamp}</span>
                        <p className="aga-contact-hero-sub">{c.sub}</p>
                    </div>
                    <img className="aga-contact-mascot" src={mascot} alt="" aria-hidden="true" />
                </div>
            </section>

            <section className="aga-contact-main aga-pad">
                <div className="aga-contact-desk">
                    <span className="aga-contact-label">{c.deskLabel}</span>
                    <a href={PHONE_HREF} className="aga-contact-phone">{PHONE}</a>

                    <div className="aga-contact-schedule">
                        <span className="aga-contact-schedule-k">{c.shippingLabel}</span>
                        <div className="aga-contact-hours">
                            <div>
                                <span className="aga-contact-label">{c.shippingWeek}</span>
                                <span className="aga-contact-hours-v">{c.shippingWeekVal}</span>
                            </div>
                            <div>
                                <span className="aga-contact-label">{c.shippingSat}</span>
                                <span className="aga-contact-hours-v">{c.shippingSatVal}</span>
                            </div>
                            <div>
                                <span className="aga-contact-label">{c.shippingSun}</span>
                                <span className="aga-contact-hours-v">{c.shippingSunVal}</span>
                            </div>
                        </div>
                    </div>

                    <div className="aga-contact-schedule">
                        <span className="aga-contact-schedule-k">{c.officeLabel}</span>
                        <div className="aga-contact-hours">
                            <div>
                                <span className="aga-contact-label">{c.officeWeek}</span>
                                <span className="aga-contact-hours-v">{c.officeWeekVal}</span>
                            </div>
                            <div>
                                <span className="aga-contact-label">{c.officeWeekend}</span>
                                <span className="aga-contact-hours-v">{c.officeWeekendVal}</span>
                            </div>
                        </div>
                    </div>

                    <div className="aga-contact-rows">
                        <a href={`mailto:${EMAIL}`} className="aga-contact-row">
                            <span className="aga-contact-label">{c.email}</span>
                            <span className="aga-contact-row-v">{EMAIL}</span>
                        </a>
                        <a href={IG_URL} target="_blank" rel="noreferrer" className="aga-contact-row">
                            <span className="aga-contact-label">{c.instagram}</span>
                            <span className="aga-contact-row-v">{IG_HANDLE}</span>
                        </a>
                        <div className="aga-contact-row">
                            <span className="aga-contact-label">{c.fax}</span>
                            <span className="aga-contact-row-v aga-contact-row-v--plain">{PHONE}</span>
                        </div>
                    </div>
                </div>

                <div className="aga-contact-place">
                    <div className="aga-contact-crate">
                        <i className="aga-contact-crate-c tl" /><i className="aga-contact-crate-c tr" />
                        <i className="aga-contact-crate-c bl" /><i className="aga-contact-crate-c br" />
                        <span className="aga-contact-crate-num">1146</span>
                        <span className="aga-contact-crate-addr">S VAIL AVE<br />MONTEBELLO CA 90640</span>
                    </div>
                    <div className="aga-contact-map">
                        <iframe
                            title={c.mapTitle}
                            src={`https://maps.google.com/maps?q=${MAP_Q}&z=15&output=embed`}
                            loading="lazy"
                        />
                    </div>
                    <a
                        className="aga-btn aga-btn--fill aga-contact-directions"
                        href={`https://www.google.com/maps/search/?api=1&query=${MAP_Q}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {c.directions}
                    </a>
                </div>
            </section>

            <section className="aga-certs">
                <div>
                    <span className="aga-certs-head">{shared.certsHeading}</span>
                    <div className="aga-certs-list">
                        {shared.certs.map((cert, i) => (
                            <div className="aga-cert" key={cert.n}>
                                <span className="aga-cert-logo">
                                    <img src={CERT_LOGOS[i]} alt={cert.n} loading="lazy" />
                                </span>
                                <span className="aga-cert-text">
                                    <span className="aga-cert-n">{cert.n}</span>
                                    <span className="aga-cert-d">{cert.d}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="aga-certs-addr">
                    <span className="aga-certs-addr-k">{c.warehouse}</span>
                    <span>{ADDRESS_LINE1}<br />{ADDRESS_LINE2}</span>
                    <a href={PHONE_HREF}>{PHONE}</a>
                </div>
            </section>

            <section className="aga-contact-trust">
                {c.trust.map((t) => (
                    <div className="aga-contact-trust-cell" key={t.k}>
                        <span className="aga-contact-trust-k">{t.k}</span>
                        <span className="aga-contact-trust-v">{t.v}</span>
                    </div>
                ))}
            </section>

            <section className="aga-contact-lower">
                <div className="aga-contact-faq aga-pad">
                    <h2 className="aga-h2">{c.faqTitle}</h2>
                    {c.faqs.map((f) => (
                        <div className="aga-contact-faq-item" key={f.q}>
                            <span className="aga-contact-faq-q">{f.q}</span>
                            <span className="aga-contact-faq-a">{f.a}</span>
                        </div>
                    ))}
                </div>

                <form className="aga-contact-form" onSubmit={onSubmit}>
                    <h2 className="aga-h2 aga-contact-form-h2">{c.formTitle}</h2>
                    <p className="aga-contact-form-sub">{c.formSub}</p>

                    <div className="aga-contact-form-grid">
                        <label className="aga-field">
                            <span>{c.fName}</span>
                            <input type="text" name="name" value={form.name} onChange={set('name')} autoComplete="name" />
                        </label>
                        <label className="aga-field">
                            <span>{c.fBusiness}</span>
                            <input type="text" name="business" value={form.business} onChange={set('business')} autoComplete="organization" />
                        </label>
                        <label className="aga-field">
                            <span>{c.fPhone}</span>
                            <input type="tel" name="phone" value={form.phone} onChange={set('phone')} autoComplete="tel" />
                        </label>
                        <label className="aga-field">
                            <span>{c.fEmail}</span>
                            <input type="email" name="email" value={form.email} onChange={set('email')} autoComplete="email" />
                        </label>
                    </div>
                    <label className="aga-field">
                        <span>{c.fMessage}</span>
                        <textarea rows="4" name="message" value={form.message} onChange={set('message')} />
                    </label>

                    <button ref={sendRef} type="submit" className="aga-btn aga-btn--fill aga-contact-send">{c.send}</button>

                    <p className="aga-contact-prefer">
                        {c.preferTalk.split('{phone}')[0]}
                        <a href={PHONE_HREF}>{PHONE}</a>
                        {c.preferTalk.split('{phone}')[1]}
                    </p>
                </form>
            </section>

            {pickerOpen && (
                <div className="aga-picker-backdrop" onClick={closePicker}>
                    <div
                        className="aga-picker"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="aga-picker-title"
                        tabIndex={-1}
                        ref={dialogRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button type="button" className="aga-picker-x" onClick={closePicker} aria-label={c.close}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                                <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                        </button>

                        <h2 id="aga-picker-title" className="aga-picker-t">{c.pickerTitle}</h2>
                        <p className="aga-picker-b">{c.pickerSub}</p>

                        <div className="aga-picker-options">
                            {providers.map((p) => (
                                <button key={p.id} type="button" className="aga-picker-option" onClick={openProvider(p)}>
                                    {p.name}
                                </button>
                            ))}
                        </div>

                        <div className="aga-picker-foot">
                            <button type="button" className="aga-picker-copy" onClick={copyDraft}>
                                {copied ? c.copied : c.copyInstead}
                            </button>
                            {copied && <span className="aga-picker-note">{c.copiedNote(EMAIL)}</span>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Contact
