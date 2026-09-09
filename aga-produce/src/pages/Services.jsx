import { Link } from 'react-router-dom'
import './Services.css'
import { useCopy } from '../i18n/useCopy'
import { servicesCopy } from './Services.copy'
import { PHONE, PHONE_HREF } from '../siteInfo'

import bandImg from '../assets/home/docks.webp'
import mascot from '../assets/products/crate_char.webp'

const pad = (i) => `${i < 9 ? '0' : ''}${i + 1}`

function Services() {
    const c = useCopy(servicesCopy)

    return (
        <div className="aga-sv">
            <header className="aga-sheet-mast aga-pad">
                <div className="aga-sheet-mast-text">
                    <span className="aga-sheet-label">{c.eyebrow}</span>
                    <h1 className="aga-h1 aga-sheet-h1">
                        {c.titleA}
                        <br />
                        {c.titleB}
                    </h1>
                    <span className="aga-sheet-stamp">{c.stamp}</span>
                </div>
                <p className="aga-sheet-lede">{c.lede}</p>
            </header>

            <section className="aga-sv-rows aga-pad">
                {c.list.map((s, i) => (
                    <article key={s.title} className="aga-sv-row">
                        <span className="aga-sv-n">{pad(i)}</span>
                        <div className="aga-sv-row-body">
                            <h2 className="aga-sv-row-title">{s.title}</h2>
                            <div className="aga-sv-row-text">
                                <p>{s.text}</p>
                                <span className="aga-sv-row-meta">{s.meta}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </section>

            <section className="aga-sv-band">
                <img src={bandImg} alt={c.bandAlt} loading="lazy" />
                <div className="aga-sv-band-text">
                    <span className="aga-sv-band-k">{c.bandK}</span>
                    <h2 className="aga-sv-band-t">{c.bandTitle}</h2>
                    <p className="aga-sv-band-b">{c.bandText}</p>
                    <ul className="aga-sv-ticks">
                        {c.bandTicks.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                </div>
            </section>

            <section className="aga-sheet-cta aga-sheet-cta--torn aga-pad">
                <div className="aga-sheet-cta-text">
                    <span className="aga-sheet-cta-k">{c.ctaK}</span>
                    <h2 className="aga-sheet-cta-t">{c.ctaTitle}</h2>
                    <p className="aga-sheet-cta-b">{c.ctaText}</p>
                    <div className="aga-sheet-cta-actions">
                        <a href={PHONE_HREF} className="aga-btn aga-btn--fill">{PHONE}</a>
                        <Link to="/products" className="aga-btn aga-btn--line-light">{c.ctaAlt}</Link>
                    </div>
                </div>
                <img className="aga-sheet-mascot" src={mascot} alt="" aria-hidden="true" />
            </section>
        </div>
    )
}

export default Services
