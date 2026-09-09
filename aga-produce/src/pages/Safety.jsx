import { Link } from 'react-router-dom'
import './Safety.css'
import { useCopy } from '../i18n/useCopy'
import { safetyCopy } from './Safety.copy'
import { PHONE, PHONE_HREF, ADDRESS_LINE1, ADDRESS_LINE2 } from '../siteInfo'

import pillarImg from '../assets/home/stations.webp'
import storyImg1 from '../assets/home/cold-room-door.webp'
import storyImg2 from '../assets/home/docks.webp'
import primusgfs from '../assets/certifications/primusgfs.webp'
import usda from '../assets/certifications/usda.webp'
import pco from '../assets/certifications/pco.webp'
import ifco from '../assets/certifications/ifco.webp'

const CERT_LOGOS = [primusgfs, usda, pco, ifco]

const pad = (i) => `${i < 9 ? '0' : ''}${i + 1}`

function Safety() {
    const c = useCopy(safetyCopy)

    return (
        <div className="aga-sf">
            <header className="aga-sheet-mast aga-pad">
                <div className="aga-sheet-mast-text">
                    <span className="aga-sheet-label">{c.eyebrow}</span>
                    <h1 className="aga-h1 aga-sheet-h1">
                        {c.titleLines.map((line, i) => (
                            <span key={line}>
                                {line}
                                {i < c.titleLines.length - 1 && <br />}
                            </span>
                        ))}
                    </h1>
                    <span className="aga-sheet-stamp">{c.stamp}</span>
                </div>
                <p className="aga-sheet-lede">{c.lede}</p>
            </header>

            <section className="aga-sf-pillar">
                <div className="aga-sf-pillar-text">
                    <span className="aga-sf-pillar-k">{c.pillarK}</span>
                    <h2 className="aga-sf-pillar-t">{c.pillarTitle}</h2>
                    <p className="aga-sf-pillar-b">{c.pillarText}</p>
                    <div className="aga-sf-stats">
                        {c.pillarStats.map((s) => (
                            <div key={s.l} className="aga-sf-stat">
                                <span className="aga-sf-stat-n">{s.n}</span>
                                <span className="aga-sf-stat-l">{s.l}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <img src={pillarImg} alt={c.pillarAlt} loading="lazy" />
            </section>

            <section className="aga-sf-tiles aga-pad">
                {c.tiles.map((t, i) => (
                    <div key={t.title} className="aga-sf-tile">
                        <span className="aga-sf-tile-n">{pad(i)}</span>
                        <h3 className="aga-sf-tile-t">{t.title}</h3>
                        <p className="aga-sf-tile-b">{t.text}</p>
                    </div>
                ))}
            </section>

            <section className="aga-sf-story aga-pad">
                <div className="aga-sf-story-text">
                    <h2 className="aga-sf-story-t">{c.storyTitle}</h2>
                    <p className="aga-sf-story-b">{c.storyP1}</p>
                    <p className="aga-sf-story-b">{c.storyP2}</p>
                    <Link to="/contact" className="aga-link">{c.storyLink}</Link>
                </div>
                <div className="aga-sf-story-imgs">
                    <img src={storyImg1} alt={c.storyAlt1} loading="lazy" />
                    <img src={storyImg2} alt={c.storyAlt2} loading="lazy" />
                </div>
            </section>

            <section className="aga-sf-cert aga-pad">
                <div>
                    <span className="aga-sf-cert-head">{c.certHead}</span>
                    <div className="aga-sf-cert-list">
                        {c.certs.map((cert, i) => (
                            <div key={cert.n} className="aga-sf-cert-item">
                                <span className="aga-sf-cert-logo">
                                    <img src={CERT_LOGOS[i]} alt={cert.n} loading="lazy" />
                                </span>
                                <span className="aga-sf-cert-txt">
                                    <span className="aga-sf-cert-n">{cert.n}</span>
                                    <span className="aga-sf-cert-d">{cert.d}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="aga-sf-cert-addr">
                    <span className="aga-sf-cert-addr-k">{c.warehouse}</span>
                    <span>{ADDRESS_LINE1}<br />{ADDRESS_LINE2}</span>
                </div>
            </section>

            <section className="aga-sheet-cta aga-sheet-cta--ink aga-pad">
                <div className="aga-sheet-cta-text">
                    <span className="aga-sheet-cta-k">{c.ctaK}</span>
                    <h2 className="aga-sheet-cta-t">{c.ctaTitle}</h2>
                    <p className="aga-sheet-cta-b">{c.ctaText}</p>
                    <div className="aga-sheet-cta-actions">
                        <a href={PHONE_HREF} className="aga-btn aga-btn--fill">{PHONE}</a>
                        <Link to="/contact" className="aga-btn aga-btn--line-light">{c.ctaAlt}</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Safety
