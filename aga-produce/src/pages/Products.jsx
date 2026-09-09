import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './Products.css'
import { useCopy } from '../i18n/useCopy'
import { productsCopy } from './Products.copy'
import { PHONE, PHONE_HREF } from '../siteInfo'

import chilesImg from '../assets/products/chiles.webp'
import onionsImg from '../assets/products/onions.webp'
import tomatoesImg from '../assets/products/tomatoes.webp'
import dryGrainsImg from '../assets/products/dry_grains.webp'
import leafyGreensImg from '../assets/products/leafy_greens.webp'
import citrusImg from '../assets/products/citrus.webp'
import mascot from '../assets/products/crate_char.webp'

const IMAGES = [chilesImg, onionsImg, tomatoesImg, dryGrainsImg, leafyGreensImg, citrusImg]

const pad = (i) => `${i < 9 ? '0' : ''}${i + 1}`

function Marked({ text, q }) {
    if (!q) return text
    const i = text.toLowerCase().indexOf(q)
    if (i < 0) return text
    return (
        <>
            {text.slice(0, i)}
            <mark className="aga-pl-mark">{text.slice(i, i + q.length)}</mark>
            {text.slice(i + q.length)}
        </>
    )
}

function Products() {
    const c = useCopy(productsCopy)
    const [query, setQuery] = useState('')

    const categories = useMemo(
        () => c.categories.map((cat, i) => ({ ...cat, n: pad(i), image: IMAGES[i] })),
        [c]
    )

    const totalItems = useMemo(
        () => categories.reduce((a, cat) => a + cat.items.length, 0),
        [categories]
    )

    const q = query.trim().toLowerCase()

    const results = useMemo(() => {
        if (!q) return categories
        return categories
            .map((cat) => {
                if (cat.title.toLowerCase().includes(q)) return { ...cat, titleHit: true }
                const items = cat.items.filter((it) => it.n.toLowerCase().includes(q))
                return items.length ? { ...cat, items } : null
            })
            .filter(Boolean)
    }, [q, categories])

    const shown = results.reduce((a, cat) => a + cat.items.length, 0)

    const pick = (title) => () =>
        setQuery((cur) => (cur.trim().toLowerCase() === title.toLowerCase() ? '' : title))

    return (
        <div className="aga-pl">
            <header className="aga-pl-mast aga-pad">
                <div className="aga-pl-mast-text">
                    <span className="aga-pl-label">{c.eyebrow}</span>
                    <h1 className="aga-h1 aga-pl-h1">
                        {c.titleA}
                        <br />
                        {c.titleB}
                    </h1>
                    <div className="aga-pl-badges">
                        <span className="aga-pl-badge aga-pl-badge--brass">
                            {c.badgeCats(categories.length)}
                        </span>
                        <span className="aga-pl-badge aga-pl-badge--green">
                            {c.badgeItems(totalItems)}
                        </span>
                    </div>
                    <p className="aga-pl-lede">{c.lede}</p>
                </div>

                <nav className="aga-pl-strip" aria-label={c.searchLabel}>
                    {categories.map((cat) => (
                        <a
                            key={cat.id}
                            href={`#${cat.id}`}
                            className="aga-pl-strip-item"
                            onClick={pick(cat.title)}
                        >
                            <img src={cat.image} alt="" aria-hidden="true" />
                            <span>{cat.short}</span>
                        </a>
                    ))}
                </nav>
            </header>

            <section className="aga-pl-search aga-pad">
                <div className="aga-pl-search-head">
                    <span className="aga-pl-search-k">{c.searchLabel}</span>
                    <span className="aga-pl-tally" role="status" aria-live="polite">
                        {q
                            ? c.tallyMatch(shown, totalItems, query.trim())
                            : c.tallyIdle(totalItems, categories.length)}
                    </span>
                </div>

                <div className="aga-pl-field">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={c.searchPlaceholder}
                        aria-label={c.searchAria}
                    />
                    <button
                        type="button"
                        className="aga-pl-clear"
                        onClick={() => setQuery('')}
                        hidden={!q}
                    >
                        {c.clear}
                    </button>
                </div>

                <div className="aga-pl-chips">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            className={`aga-pl-chip${q === cat.title.toLowerCase() ? ' is-on' : ''}`}
                            aria-pressed={q === cat.title.toLowerCase()}
                            onClick={pick(cat.title)}
                        >
                            {cat.title}
                        </button>
                    ))}
                </div>
            </section>

            <section className="aga-pl-results aga-pad">
                {results.map((cat) => (
                    <article key={cat.id} id={cat.id} className="aga-pl-row">
                        <div className="aga-pl-thumb">
                            <img src={cat.image} alt="" aria-hidden="true" loading="lazy" />
                            <span className="aga-pl-n">{cat.n}</span>
                        </div>

                        <div className="aga-pl-row-body">
                            <h2 className="aga-pl-cat">
                                <Marked text={cat.title} q={q} />
                            </h2>
                            <ul className="aga-pl-items">
                                {cat.items.map((it) => (
                                    <li key={it.n} className="aga-pl-item">
                                        <span>
                                            <Marked text={it.n} q={cat.titleHit ? '' : q} />
                                        </span>
                                        {it.tag && <span className="aga-pl-item-tag">{it.tag}</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="aga-pl-count">
                            <span className="aga-pl-count-n">{cat.items.length}</span>
                            <span className="aga-pl-count-l">
                                {cat.items.length === 1 ? c.varietyOne : c.varietyMany}
                            </span>
                        </div>
                    </article>
                ))}

                {q && results.length === 0 && (
                    <div className="aga-pl-empty">
                        <span className="aga-pl-empty-k">{c.emptyKicker}</span>
                        <h2 className="aga-pl-empty-t">{c.emptyTitle(query.trim())}</h2>
                        <p className="aga-pl-empty-b">{c.emptyBody}</p>
                        <a href={PHONE_HREF} className="aga-pl-empty-cta">{c.emptyCta} {PHONE}</a>
                    </div>
                )}
            </section>

            <section className="aga-pl-notes aga-pad">
                {c.notes.map((note) => (
                    <div key={note.k} className="aga-pl-note">
                        <span className="aga-pl-note-k">{note.k}</span>
                        <span className="aga-pl-note-v">{note.v}</span>
                    </div>
                ))}
            </section>

            <section className="aga-pl-cta aga-pad">
                <div className="aga-pl-cta-text">
                    <span className="aga-pl-cta-k">{c.ctaKicker}</span>
                    <h2 className="aga-pl-cta-t">{c.ctaTitle}</h2>
                    <p className="aga-pl-cta-b">{c.ctaBody}</p>
                    <div className="aga-pl-cta-actions">
                        <a href={PHONE_HREF} className="aga-btn aga-btn--fill">{PHONE}</a>
                        <Link to="/contact" className="aga-btn aga-btn--line-light">{c.ctaMessage}</Link>
                    </div>
                </div>
                <img className="aga-pl-mascot" src={mascot} alt="" aria-hidden="true" />
            </section>
        </div>
    )
}

export default Products
