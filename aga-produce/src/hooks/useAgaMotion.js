import { useEffect, useRef, useState } from 'react'

const reduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useParallax(factor = 0.14, max = 900) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (reduced()) return
        const phone = window.matchMedia('(max-width: 720px)')
        const onScroll = () => {
            if (phone.matches) return
            const y = Math.min(window.scrollY, max) * factor
            el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`
        }
        const onChange = () => { el.style.transform = ''; onScroll() }
        window.addEventListener('scroll', onScroll, { passive: true })
        phone.addEventListener('change', onChange)
        onScroll()
        return () => {
            window.removeEventListener('scroll', onScroll)
            phone.removeEventListener('change', onChange)
        }
    }, [factor, max])
    return ref
}

export function useHeroMotion() {
    const imgRef = useRef(null)
    const textRef = useRef(null)
    useEffect(() => {
        const img = imgRef.current
        const text = textRef.current
        if (!img && !text) return
        if (reduced()) return

        const phone = window.matchMedia('(max-width: 720px)')

        const clear = () => {
            if (img) img.style.transform = ''
            if (text) { text.style.transform = ''; text.style.opacity = '' }
        }

        const onScroll = () => {
            if (phone.matches) return
            const t = Math.min(window.scrollY, 800)
            if (img) img.style.transform = `translate3d(0, ${(t * 0.3).toFixed(1)}px, 0)`
            if (text) {
                text.style.transform = `translate3d(0, ${(t * -0.12).toFixed(1)}px, 0)`
                text.style.opacity = Math.max(0, Math.min(1, (620 - t) / 200)).toFixed(3)
            }
        }

        const onChange = () => { clear(); onScroll() }

        window.addEventListener('scroll', onScroll, { passive: true })
        phone.addEventListener('change', onChange)
        onScroll()
        return () => {
            window.removeEventListener('scroll', onScroll)
            phone.removeEventListener('change', onChange)
        }
    }, [])
    return { imgRef, textRef }
}

export function useSectionSpy(sections) {
    const [active, setActive] = useState(0)
    const [shown, setShown] = useState(false)

    useEffect(() => {
        let offsets = []

        const measure = () => {
            offsets = []
            document.querySelectorAll('[data-sec]').forEach((n) => {
                const i = sections.indexOf(n.getAttribute('data-sec'))
                if (i >= 0) offsets.push([i, n.getBoundingClientRect().top + window.scrollY])
            })
            offsets.sort((a, b) => a[1] - b[1])
        }

        const onScroll = () => {
            const top = window.scrollY
            setShown(top > 240)
            const mid = top + window.innerHeight * 0.45
            let next = 0
            for (const [i, y] of offsets) if (y <= mid) next = i
            setActive(next)
        }

        const onResize = () => { measure(); onScroll() }

        measure()
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onResize)
        window.addEventListener('load', onResize)

        const ro = new ResizeObserver(measure)
        ro.observe(document.body)

        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
            window.removeEventListener('load', onResize)
            ro.disconnect()
        }
    }, [sections])

    return { active, shown }
}

export function useCountUp() {
    const ref = useRef(null)
    useEffect(() => {
        const root = ref.current
        if (!root) return
        const nodes = root.querySelectorAll('[data-count]')
        if (!nodes.length) return
        const reduce = reduced()

        const run = (el) => {
            const raw = el.getAttribute('data-count')
            const target = parseInt(raw.replace(/[^0-9]/g, ''), 10)
            const suffix = raw.replace(/[0-9]/g, '')
            const from = parseInt(el.getAttribute('data-from') || '0', 10)
            if (reduce || Number.isNaN(target)) { el.textContent = raw; return }
            const dur = 1100
            const t0 = performance.now()
            let done = false
            const finish = () => {
                if (done) return
                done = true
                el.textContent = raw
            }
            const tick = (now) => {
                const p = Math.min((now - t0) / dur, 1)
                if (p >= 1) { finish(); return }
                const e = 1 - Math.pow(1 - p, 3)
                el.textContent = Math.round(from + (target - from) * e) + suffix
                requestAnimationFrame(tick)
            }
            el.textContent = from + suffix
            requestAnimationFrame(tick)
            setTimeout(finish, dur + 200)
        }

        const io = new IntersectionObserver((entries) => {
            entries.forEach((en) => {
                if (en.isIntersecting && !en.target.dataset.ran) {
                    en.target.dataset.ran = '1'
                    run(en.target)
                }
            })
        }, { threshold: 0.5 })

        nodes.forEach((n) => io.observe(n))
        return () => io.disconnect()
    }, [])
    return ref
}
