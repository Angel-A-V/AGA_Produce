import { useState, useEffect } from 'react'
import './BackToTop.css'

/**
 * Floating "back to top" button.
 * Appears after the user scrolls past one viewport height,
 * scrolls smoothly back to the top when clicked.
 */
function BackToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > window.innerHeight)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollToTop = () => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    }

    return (
        <button
            type="button"
            className={`back-to-top ${visible ? 'is-visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Back to top"
            tabIndex={visible ? 0 : -1}
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="22"
                height="22"
                aria-hidden="true"
            >
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
            </svg>
        </button>
    )
}

export default BackToTop