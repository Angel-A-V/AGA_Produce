import { Link } from 'react-router-dom'
import './About.css'
import { useCopy } from '../i18n/useCopy'
import { aboutCopy } from './About.copy'
import { sharedCopy } from '../components/shared.copy'
import { PHONE, PHONE_HREF, ADDRESS_LINE1, ADDRESS_LINE2 } from '../siteInfo'
import { useParallax, useCountUp } from '../hooks/useAgaMotion'

import heroImg from '../assets/home/about.webp'
import mascot from '../assets/products/crate_char.webp'
import coldRoom from '../assets/about/cold-room.webp'
import repackLine from '../assets/about/repack-line.webp'
import weighing from '../assets/about/weighing.webp'

import primusgfs from '../assets/certifications/primusgfs.webp'
import usda from '../assets/certifications/usda.webp'
import pco from '../assets/certifications/pco.webp'
import ifco from '../assets/certifications/ifco.webp'

const CERT_LOGOS = [primusgfs, usda, pco, ifco]
const INSIDE_IMGS = [coldRoom, repackLine, weighing]

function About() {
    const c = useCopy(aboutCopy)
    const shared = useCopy(sharedCopy)
    const heroRef = useParallax(0.14)
    const statsRef = useCountUp()

    return (
        <div className="aga-about">
            <section className="aga-about-hero">
                <div className="aga-about-hero-text aga-pad">
                    <p className="aga-eyebrow">{c.eyebrow}</p>
                    <h1 className="aga-h1">{c.title}</h1>
                    <p className="aga-lede">{c.sub}</p>
                    <div className="aga-about-stamps">
                        <span className="aga-stamp aga-stamp--green">{c.stampFamily}</span>
                        <span className="aga-stamp aga-stamp--brass">{c.stampWholesale}</span>
                    </div>
                    <Link to="/contact" className="aga-link">{c.cta}</Link>
                </div>
                <div className="aga-about-hero-img">
                    <img ref={heroRef} src={heroImg} alt={c.caption} />
                    <span className="aga-about-hero-cap">{c.caption}</span>
                </div>
            </section>

            <section className="aga-stats" ref={statsRef}>
                {shared.stats.map((s, i) => (
                    <div className="aga-stat" key={s.label}>
                        <span
                            className="aga-stat-num"
                            data-count={s.v}
                            data-from={i === 0 ? '2000' : '0'}
                        >{s.v}</span>
                        <span className="aga-stat-label">{s.label}</span>
                    </div>
                ))}
            </section>

            <section className="aga-about-story aga-pad">
                <div className="aga-about-ledger">
                    <span className="aga-about-ledger-head">{c.metaHead}</span>
                    {c.meta.map((m) => <span key={m}>{m}</span>)}
                </div>
                <div className="aga-about-story-text">
                    <h2 className="aga-h2">{c.storyTitle}</h2>
                    <p className="aga-body">{c.storyP1}</p>
                    <p className="aga-body">{c.storyP2}</p>
                    <p className="aga-body">{c.storyP3}</p>
                </div>
            </section>

            <section className="aga-about-quote aga-pad">
                <div className="aga-about-quote-inner">
                    <span className="aga-about-quote-k">{c.quoteKicker}</span>
                    <p className="aga-about-quote-t">{c.quote}</p>
                    <span className="aga-about-quote-by">{c.quoteBy}</span>
                </div>
            </section>

            <section className="aga-about-values aga-pad">
                <div className="aga-about-sec-head">
                    <h2 className="aga-h2">{c.valuesTitle}</h2>
                    <span className="aga-kicker">{c.valuesKicker}</span>
                </div>
                {c.values.map((v) => (
                    <div className="aga-about-value" key={v.n}>
                        <span className="aga-about-value-n">{v.n}</span>
                        <span className="aga-about-value-t">{v.t}</span>
                        <span className="aga-about-value-d">{v.d}</span>
                    </div>
                ))}
            </section>

            <section className="aga-about-inside aga-pad">
                <div className="aga-about-sec-head aga-about-inside-head">
                    <h2 className="aga-h2">{c.insideTitle}</h2>
                    <span className="aga-kicker">{c.insideKicker}</span>
                </div>
                {c.inside.map((p, i) => (
                    <figure className="aga-figure" key={p.k}>
                        <div className="aga-figure-img aga-about-inside-img">
                            <img src={INSIDE_IMGS[i]} alt={p.alt} loading="lazy" />
                        </div>
                        <figcaption className="aga-figure-cap">
                            <span className="aga-figure-k">{p.k}</span>
                            <span className="aga-figure-d">{p.d}</span>
                        </figcaption>
                    </figure>
                ))}
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
                    <span className="aga-certs-addr-k">{c.warehouseLabel}</span>
                    <span>{ADDRESS_LINE1}<br />{ADDRESS_LINE2}</span>
                    <a href={PHONE_HREF}>{PHONE}</a>
                </div>
            </section>

            <section className="aga-about-cta aga-pad">
                <div className="aga-about-cta-text">
                    <h2 className="aga-h2">{c.ctaTitle}</h2>
                    <p className="aga-body">{c.ctaP}</p>
                    <div className="aga-about-cta-btns">
                        <a href={PHONE_HREF} className="aga-btn aga-btn--fill">{PHONE}</a>
                        <Link to="/contact" className="aga-btn aga-btn--line">{c.ctaSecondary}</Link>
                    </div>
                </div>
                <img className="aga-about-cta-mascot" src={mascot} alt="" aria-hidden="true" />
            </section>
        </div>
    )
}

export default About
