import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import { useCopy } from '../i18n/useCopy'
import { homeCopy } from './Home.copy'
import { sharedCopy } from '../components/shared.copy'
import { PHONE, PHONE_HREF, EMAIL, ADDRESS_LINE1, ADDRESS_LINE2 } from '../siteInfo'
import { useHeroMotion, useCountUp } from '../hooks/useAgaMotion'

import heroImg from '../assets/home/greens.webp'
import receptionImg from '../assets/home/reception.webp'
import repackImg from '../assets/home/repack.webp'
import docksImg from '../assets/home/docks.webp'
import safetyImg from '../assets/home/weighing.webp'
import mascot from '../assets/products/crate_char.webp'

import chiles from '../assets/products/chiles.webp'
import onions from '../assets/products/onions.webp'
import tomatoes from '../assets/products/tomatoes.webp'
import grains from '../assets/products/dry_grains.webp'
import greens from '../assets/products/leafy_greens.webp'
import citrus from '../assets/products/citrus.webp'

import primusgfs from '../assets/certifications/primusgfs.webp'
import usda from '../assets/certifications/usda.webp'
import pco from '../assets/certifications/pco.webp'
import ifco from '../assets/certifications/ifco.webp'

const CATEGORY_IMGS = [chiles, onions, tomatoes, grains, greens, citrus]
const CERT_LOGOS = [primusgfs, usda, pco, ifco]

function Home() {
    const c = useCopy(homeCopy)
    const shared = useCopy(sharedCopy)
    const { imgRef, textRef } = useHeroMotion()
    const statsRef = useCountUp()
    const [cat, setCat] = useState(0)

    return (
        <div className="aga-home">
            <section className="aga-home-hero" data-sec="intro">
                <img ref={imgRef} className="aga-home-hero-img" src={heroImg} alt={c.caption} />
                <div className="aga-home-hero-scrim" />
                <div className="aga-home-hero-inner aga-pad">
                    <div className="aga-home-hero-text" ref={textRef}>
                        <p className="aga-eyebrow">{c.eyebrow}</p>
                        <h1 className="aga-h1 aga-home-hero-h1">{c.title}</h1>
                        <p className="aga-home-hero-sub">{c.sub}</p>
                        <div className="aga-home-hero-btns">
                            <Link to="/products" className="aga-btn aga-btn--fill">{c.ctaRange}</Link>
                            <a href={PHONE_HREF} className="aga-btn aga-btn--line-light">{PHONE}</a>
                        </div>
                    </div>
                    <span className="aga-home-hero-cap">{c.caption}</span>
                </div>
            </section>

            <section className="aga-stats" ref={statsRef}>
                {shared.stats.map((s, i) => (
                    <div className="aga-stat" key={s.label}>
                        <span className="aga-stat-num" data-count={s.v} data-from={i === 0 ? '2000' : '0'}>{s.v}</span>
                        <span className="aga-stat-label">{s.label}</span>
                    </div>
                ))}
            </section>

            <section className="aga-home-company aga-pad" data-sec="about">
                <div className="aga-home-company-text">
                    <p className="aga-eyebrow aga-eyebrow--plain">{c.companyEyebrow}</p>
                    <h2 className="aga-h2">{c.companyTitle}</h2>
                    <p className="aga-body">{c.companyP1}</p>
                    <p className="aga-body">{c.companyP2}</p>
                    <Link to="/about" className="aga-link">{c.companyLink}</Link>
                </div>
                <div className="aga-home-company-media">
                    <img
                        className="aga-home-company-img"
                        src={receptionImg}
                        alt={c.altReception}
                        loading="lazy"
                    />
                    <div className="aga-home-plate">
                        <span className="aga-home-plate-num">1146</span>
                        <span className="aga-home-plate-addr">{ADDRESS_LINE1}<br />{ADDRESS_LINE2}</span>
                    </div>
                </div>
            </section>

            <section className="aga-home-why aga-pad">
                <div className="aga-home-why-head">
                    <h2 className="aga-h2">{c.whyTitle}</h2>
                    <span className="aga-kicker">{c.whyKicker}</span>
                </div>
                <div className="aga-home-why-grid">
                    {c.why.map((w) => (
                        <div className="aga-home-why-item" key={w.n}>
                            <span className="aga-home-why-n">{w.n}</span>
                            <div className="aga-home-why-body">
                                <h3 className="aga-home-why-t">{w.t}</h3>
                                <p className="aga-home-why-d">{w.d}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="aga-home-range aga-pad" data-sec="products">
                <div className="aga-home-range-text">
                    <p className="aga-eyebrow aga-eyebrow--plain">{c.rangeEyebrow}</p>
                    <h2 className="aga-h2 aga-home-range-h2">{c.rangeTitle}</h2>
                    <div className="aga-home-cats">
                        {c.categories.map((cat_, i) => (
                            <Link
                                to="/products"
                                key={cat_.name}
                                className={`aga-home-cat${i === cat ? ' is-active' : ''}`}
                                onMouseEnter={() => setCat(i)}
                                onFocus={() => setCat(i)}
                            >
                                <span className="aga-home-cat-head">
                                    <span className="aga-home-cat-n">{cat_.name}</span>
                                    <span className="aga-home-cat-c">{cat_.count}</span>
                                </span>
                                <span className="aga-home-cat-i">{cat_.items}</span>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="aga-home-range-media" aria-hidden="true">
                    {CATEGORY_IMGS.map((src, i) => (
                        <img
                            key={c.categories[i].name}
                            className={`aga-home-range-img${i === cat ? ' is-active' : ''}`}
                            src={src}
                            alt=""
                            loading="lazy"
                        />
                    ))}
                </div>
            </section>

            <section className="aga-home-repack" data-sec="repacking">
                <img
                    className="aga-home-repack-img"
                    src={repackImg}
                    alt={c.altRepack}
                    loading="lazy"
                />
                <div className="aga-home-repack-panel">
                    <p className="aga-eyebrow aga-eyebrow--plain aga-home-repack-eyebrow">{c.repackEyebrow}</p>
                    <h2 className="aga-h2 aga-home-repack-h2">{c.repackTitle}</h2>
                    <p className="aga-home-repack-p">{c.repackP}</p>
                    <ul className="aga-home-repack-tags">
                        {c.repackTags.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                </div>
            </section>

            <section className="aga-home-safety aga-pad" data-sec="safety">
                <div className="aga-home-safety-media">
                    <div className="aga-home-safety-shot">
                        <img src={docksImg} alt={c.altDocks} loading="lazy" />
                        <span className="aga-home-safety-tint" />
                    </div>
                    <img
                        className="aga-home-safety-shot2"
                        src={safetyImg}
                        alt={c.altSafety}
                        loading="lazy"
                    />
                </div>
                <div className="aga-home-safety-text">
                    <p className="aga-eyebrow aga-eyebrow--plain">{c.safetyEyebrow}</p>
                    <h2 className="aga-h2">{c.safetyTitle}</h2>
                    <p className="aga-body">{c.safetyP}</p>
                    <Link to="/safety" className="aga-link">{c.safetyLink}</Link>
                </div>
            </section>

            <section className="aga-home-certs aga-pad">
                <div className="aga-home-certs-head">
                    <span className="aga-kicker">{c.certTitle}</span>
                    <span className="aga-home-certs-rule" />
                </div>
                <div className="aga-home-certs-grid">
                    {shared.certs.map((cert, i) => (
                        <div className="aga-home-certs-cell" key={cert.n}>
                            <img src={CERT_LOGOS[i]} alt={cert.n} loading="lazy" />
                            <span>{cert.d}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="aga-home-contact aga-pad" data-sec="contact">
                <div className="aga-home-contact-text">
                    <h2 className="aga-h2 aga-home-contact-h2">{c.contactTitle}</h2>
                    <p className="aga-home-contact-p">{c.contactP}</p>
                    <img className="aga-home-contact-mascot" src={mascot} alt="" aria-hidden="true" />
                </div>
                <div className="aga-home-contact-desk">
                    <a href={PHONE_HREF} className="aga-home-contact-phone">{PHONE}</a>
                    <div className="aga-home-contact-hours">
                        {c.hours.map((h) => <span key={h}>{h}</span>)}
                    </div>
                    <a href={`mailto:${EMAIL}`} className="aga-btn aga-btn--line-light aga-home-contact-msg">{c.contactMsg}</a>
                    <Link to="/contact" className="aga-home-contact-link">{c.contactLink}</Link>
                </div>
            </section>
        </div>
    )
}

export default Home
