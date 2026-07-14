import { useState, useRef, useEffect } from 'react'
import './StatsBand.css'

/**
 * Animated stats band.
 * Numbers count up from 0 the first time the band scrolls into view.
 * Respects prefers-reduced-motion (numbers just appear).
 */

const STATS = [
    { value: new Date().getFullYear() - 2020, suffix: '+', label: 'Years in business' },
    { value: 6, suffix: '', label: 'Delivery days a week' },
    { value: 30, suffix: '+', label: 'Produce varieties' },
    { value: 100, suffix: '%', label: 'Cold-chain, every order' },
]

const DURATION = 1400 // ms

function easeOut(t) {
    return 1 - Math.pow(1 - t, 3)
}

function StatsBand() {
    const ref = useRef(null)
    const [started, setStarted] = useState(false)
    const [counts, setCounts] = useState(STATS.map(() => 0))

    // Start once, when the band enters the viewport
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.35 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    // Count-up animation
    useEffect(() => {
        if (!started) return

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduce) {
            setCounts(STATS.map((s) => s.value))
            return
        }

        let raf
        const t0 = performance.now()
        const tick = (now) => {
            const p = Math.min((now - t0) / DURATION, 1)
            const eased = easeOut(p)
            setCounts(STATS.map((s) => Math.round(s.value * eased)))
            if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [started])

    return (
        <div className="stats-band" ref={ref}>
            <div className="stats-band-inner">
                {STATS.map((s, i) => (
                    <div className="stat" key={s.label}>
                        <p className="stat-value">
                            {counts[i]}
                            <span className="stat-suffix">{s.suffix}</span>
                        </p>
                        <p className="stat-label">{s.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StatsBand