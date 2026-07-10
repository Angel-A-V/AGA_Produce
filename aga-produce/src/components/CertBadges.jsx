import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import primusgfs from '../assets/certifications/primusgfs.webp'
import usda from '../assets/certifications/usda.webp'
import ifco from '../assets/certifications/ifco.webp'
import pco from '../assets/certifications/pco.webp'

const GREEN_DARK = '#2d5a1b'
const GOLD = '#c9a84c'
const TEXT_DARK = '#3d3228'
const FONT = 'Nunito, sans-serif'

const SEALS = [
    { src: primusgfs, alt: 'PrimusGFS Certified' },
    { src: usda, alt: 'USDA' },
    { src: pco, alt: 'PCO Certified Organic' },
    { src: ifco, alt: 'IFCO' },
]

/**
 * Certification / standards seal band.
 *
 * props:
 *   variant  'light' (default) — for cream/white page sections
 *            'dark'            — for green-tinted sections
 *   heading  optional eyebrow text (pass null to hide)
 *   subtext  optional sub line (pass null to hide)
 */
function CertBadges({
    variant = 'light',
    heading = 'Certifications & Standards',
    subtext = 'Audited, inspected, and held to recognized food-safety and quality standards.',
    className = '',
}) {
    const isDark = variant === 'dark'

    return (
        <Box
            className={className}
            sx={{
                width: '100%',
                textAlign: 'center',
                px: 3,
                py: { xs: 5, md: 6 },
            }}
        >
            {heading && (
                <Typography
                    sx={{
                        fontFamily: FONT,
                        fontWeight: 800,
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        fontSize: '0.8rem',
                        color: GOLD,
                        mb: 1,
                    }}
                >
                    {heading}
                </Typography>
            )}

            {subtext && (
                <Typography
                    sx={{
                        fontFamily: FONT,
                        fontWeight: 500,
                        fontSize: '1.02rem',
                        color: isDark ? 'rgba(255,255,255,0.82)' : TEXT_DARK,
                        opacity: isDark ? 1 : 0.78,
                        maxWidth: 640,
                        mx: 'auto',
                        mb: { xs: 3.5, md: 4.5 },
                    }}
                >
                    {subtext}
                </Typography>
            )}

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: { xs: 3.5, md: 6 },
                    maxWidth: 900,
                    mx: 'auto',
                }}
            >
                {SEALS.map((s) => (
                    <Box
                        key={s.alt}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: { xs: 54, md: 68 },
                            flex: '0 0 auto',
                        }}
                    >
                        <Box
                            component="img"
                            src={s.src}
                            alt={s.alt}
                            loading="lazy"
                            decoding="async"
                            title={s.alt}
                            sx={{
                                maxHeight: '100%',
                                maxWidth: { xs: 110, md: 150 },
                                width: 'auto',
                                objectFit: 'contain',
                                display: 'block',
                                // On dark backgrounds, drop a subtle plate behind
                                // logos so black wordmarks (PrimusGFS) stay legible.
                                ...(isDark && {
                                    bgcolor: '#fff',
                                    borderRadius: 2,
                                    p: 1.25,
                                    boxSizing: 'content-box',
                                }),
                                filter: isDark
                                    ? 'none'
                                    : 'drop-shadow(0 2px 6px rgba(0,0,0,0.08))',
                                transition: 'transform 0.25s ease, filter 0.25s ease',
                                '&:hover': {
                                    transform: 'translateY(-3px)',
                                    filter: isDark
                                        ? 'drop-shadow(0 6px 14px rgba(0,0,0,0.25))'
                                        : 'drop-shadow(0 6px 14px rgba(0,0,0,0.16))',
                                },
                            }}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default CertBadges