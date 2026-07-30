import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import './CertBadges.css'
import primusgfs from '../assets/certifications/primusgfs.webp'
import usda from '../assets/certifications/usda.webp'
import ifco from '../assets/certifications/ifco.webp'
import pco from '../assets/certifications/pco.webp'
import { useLanguage } from '../i18n/useLanguage'

const FONT = 'Nunito, sans-serif'

/**
 * Certification / standards band.
 * Each mark sits in its own framed tile with a name + one-line note,
 * so the section reads as credentials rather than a loose logo row.
 *
 * props:
 *   variant  'light' (default) | 'dark'
 *   heading / subtext — pass null to hide, otherwise defaults to the translated copy
 */
function CertBadges({
    variant = 'light',
    heading,
    subtext,
    className = '',
}) {
    const { t } = useLanguage()
    const resolvedHeading = heading === null ? null : (heading ?? t('certBadges.heading'))
    const resolvedSubtext = subtext === null ? null : (subtext ?? t('certBadges.subtextDefault'))
    const seals = t('certBadges.seals')

    const SEALS = [
        { src: primusgfs, alt: 'PrimusGFS Certified', note: seals.primusgfs },
        { src: usda, alt: 'USDA', note: seals.usda },
        { src: pco, alt: 'PCO Certified Organic', note: seals.pco },
        { src: ifco, alt: 'IFCO', note: seals.ifco },
    ]

    return (
        <Box className={`cert-band cert-band--${variant} ${className}`.trim()}>
            {resolvedHeading && (
                <Typography
                    className="cert-band-eyebrow"
                    sx={{ fontFamily: FONT }}
                >
                    {resolvedHeading}
                </Typography>
            )}
            {resolvedSubtext && (
                <Typography
                    className="cert-band-sub"
                    sx={{ fontFamily: FONT }}
                >
                    {resolvedSubtext}
                </Typography>
            )}

            <div className="cert-tiles">
                {SEALS.map((s) => (
                    <div className="cert-tile" key={s.alt}>
                        <div className="cert-tile-logo">
                            <img
                                src={s.src}
                                alt={s.alt}
                                title={s.alt}
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <p className="cert-tile-note">{s.note}</p>
                    </div>
                ))}
            </div>
        </Box>
    )
}

export default CertBadges