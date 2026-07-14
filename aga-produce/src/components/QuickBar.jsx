import { useState, useEffect } from 'react'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import './QuickBar.css'

const TEL = '3234771177'
const TEL_DISPLAY = '(323) 477-1177'

/**
 * Mobile-only quick-action bar.
 * Slides up from the bottom once the user scrolls, giving wholesale
 * customers a one-tap "Call" and "Message" from any page.
 * Hidden on the Contact page (redundant there) and on desktop widths.
 */
function QuickBar() {
    const [visible, setVisible] = useState(false)
    const { pathname } = useLocation()

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 320)
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    if (pathname === '/contact') return null

    return (
        <div className={`quick-bar ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
            <a className="quick-bar-btn quick-bar-call" href={`tel:${TEL}`} tabIndex={visible ? 0 : -1}>
                <svg
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    width="18" height="18" aria-hidden="true"
                >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call {TEL_DISPLAY}
            </a>
            <RouterLink className="quick-bar-btn quick-bar-msg" to="/contact" tabIndex={visible ? 0 : -1}>
                <svg
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    width="18" height="18" aria-hidden="true"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Message
            </RouterLink>
        </div>
    )
}

export default QuickBar