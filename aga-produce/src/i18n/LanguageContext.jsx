import { useCallback, useMemo, useState } from 'react'
import { translations } from './translations'
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

    /* Dotted-path lookup against the active dictionary, e.g. t('home.heroTitle').
       Falls back to English so a missing key never renders blank. */
    const t = useCallback((path) => {
        const dict = translations[lang]
        const fallback = translations.en
        const value = path.split('.').reduce((acc, key) => acc?.[key], dict)
        if (value !== undefined) return value
        return path.split('.').reduce((acc, key) => acc?.[key], fallback)
    }, [lang])

    const value = useMemo(() => ({ lang, setLanguage, toggleLang, t }), [lang, setLanguage, toggleLang, t])

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
