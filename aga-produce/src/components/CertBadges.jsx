import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import './CertBadges.css'
import primusgfs from '../assets/certifications/primusgfs.webp'
import usda from '../assets/certifications/usda.webp'
import ifco from '../assets/certifications/ifco.webp'
import pco from '../assets/certifications/pco.webp'

const FONT = 'Nunito, sans-serif'

const SEALS = [
    { src: primusgfs, alt: 'PrimusGFS Certified', note: 'Food-safety audited' },
    { src: usda, alt: 'USDA', note: 'Federal standards' },
    { src: pco, alt: 'PCO Certified Organic', note: 'Selected products' },
    { src: ifco, alt: 'IFCO', note: 'Reusable packaging' },
]

/**
 * Certification / standards band.
 * Each mark sits in its own framed tile with a name + one-line note,
 * so the section reads as credentials rather than a loose logo row.
 *
 * props:
 *   variant  'light' (default) | 'dark'
 *   heading / subtext — pass null to hide
 */
function CertBadges({
    variant = 'light',
    heading = 'Certifications & Standards',
    subtext = 'Audited, inspected, and held to recognized food-safety and quality standards.',
    className = '',
}) {
    return (
        <Box className={`cert-band cert-band--${variant} ${className}`.trim()}>
            {heading && (
                <Typography
                    className="cert-band-eyebrow"
                    sx={{ fontFamily: FONT }}
                >
                    {heading}
                </Typography>
            )}
            {subtext && (
                <Typography
                    className="cert-band-sub"
                    sx={{ fontFamily: FONT }}
                >
                    {subtext}
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