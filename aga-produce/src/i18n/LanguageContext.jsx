import { useCallback, useMemo, useState } from 'react'
import { LanguageContext } from './context'

const STORAGE_KEY = 'aga-lang'

function getInitialLang() {
    if (typeof window === 'undefined') return 'en'
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'es') return stored
    return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(getInitialLang)

    const setLanguage = useCallback((next) => {
        setLang(next)
        window.localStorage.setItem(STORAGE_KEY, next)
        document.documentElement.lang = next
    }, [])

    const toggleLang = useCallback(() => {
        setLanguage(lang === 'en' ? 'es' : 'en')
    }, [lang, setLanguage])

    const value = useMemo(() => ({ lang, setLanguage, toggleLang }), [lang, setLanguage, toggleLang])

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
