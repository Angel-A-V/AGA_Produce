import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const FORCE_TOP_PATHS = ['/contact']

function ScrollToTop() {
    const { pathname } = useLocation()
    const navType = useNavigationType()

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'auto'
        }
    }, [])

    useEffect(() => {
        if (navType !== 'POP' && FORCE_TOP_PATHS.includes(pathname)) {
            window.scrollTo(0, 0)
        }
    }, [pathname, navType])

    return null
}

export default ScrollToTop
