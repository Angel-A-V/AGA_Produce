// import { useEffect } from 'react'
// import { useLocation, useNavigationType } from 'react-router-dom'

// const FORCE_TOP_PATHS = ['/contact']

// function ScrollToTop() {
//     const { pathname } = useLocation()
//     const navType = useNavigationType()

//     useEffect(() => {
//         if ('scrollRestoration' in window.history) {
//             window.history.scrollRestoration = 'auto'
//         }
//     }, [])

//     useEffect(() => {
//         if (navType !== 'POP' && FORCE_TOP_PATHS.includes(pathname)) {
//             window.scrollTo(0, 0)
//         }
//     }, [pathname, navType])

//     return null
// }

// export default ScrollToTop

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
    const { pathname } = useLocation()
    // Track whether this is the very first render (i.e. a fresh page load / refresh)
    const isFirstRender = useRef(true)

    useEffect(() => {
        // Let the browser remember and restore scroll positions on refresh (F5 / Cmd+R).
        // 'auto' means the browser will restore where the user was when they refresh.
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'auto'
        }
    }, [])

    useEffect(() => {
        // On the very first render the user either typed a URL or refreshed.
        // In both cases we want the browser's native scroll restoration to handle it,
        // so we skip the scroll-to-top call and just mark the first render done.
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        // For every subsequent route change (clicking a link / navigating),
        // reset to the top so each new page feels fresh.
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

export default ScrollToTop