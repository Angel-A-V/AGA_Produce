import { useMemo } from 'react'
import { useLanguage } from './useLanguage'

const isPair = (node) =>
    node !== null &&
    typeof node === 'object' &&
    !Array.isArray(node) &&
    ('en' in node || 'es' in node) &&
    Object.keys(node).every((k) => k === 'en' || k === 'es')

function resolve(node, lang) {
    if (isPair(node)) return node[lang] ?? node.en
    if (Array.isArray(node)) return node.map((n) => resolve(n, lang))
    if (node !== null && typeof node === 'object') {
        const out = {}
        for (const key of Object.keys(node)) out[key] = resolve(node[key], lang)
        return out
    }
    return node
}

export function useCopy(copy) {
    const { lang } = useLanguage()
    return useMemo(() => resolve(copy, lang), [copy, lang])
}
