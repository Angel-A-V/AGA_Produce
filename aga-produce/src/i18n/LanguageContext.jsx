import { useCallback, useMemo, useState } from 'react'
import { LanguageContext } from './context'

const STORAGE_KEY = 'aga-lang'

// Spanish is switched off at the client's request (Sep 2026) until the Spanish
// copy has been revised. The translations are still in the *.copy.js files and
// useCopy still resolves by language, so turning this back on is a one-line
// change and nothing has to be re-translated.
export const SPANISH_ENABLED = false

function getInitialLang() {
    if (!SPANISH_ENABLED) return 'en'
    if (typeof window === 'undefined') return 'en'
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'es') return stored
    return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(getInitialLang)

    const setLanguage = useCallback((next) => {
        if (!SPANISH_ENABLED) return
        setLang(next)
        window.localStorage.setItem(STORAGE_KEY, next)
        document.documentElement.lang = next
    }, [])

    const toggleLang = useCallback(() => {
        setLanguage(lang === 'en' ? 'es' : 'en')
    }, [lang, setLanguage])

    const value = useMemo(
        () => ({ lang, setLanguage, toggleLang, spanishEnabled: SPANISH_ENABLED }),
        [lang, setLanguage, toggleLang]
    )

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
