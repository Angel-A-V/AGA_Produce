import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import crateChar from '../assets/products/crate_char.webp'
import './Buttons.css'
import './CtaBanner.css'
import { useLanguage } from '../i18n/useLanguage'

const FONT = 'Nunito, sans-serif'

function CtaBanner({
    title,
    subtitle,
    button,
    to = '/contact',
    className = '',
}) {
    const { t } = useLanguage()
    const resolvedTitle = title ?? t('ctaBanner.defaultTitle')
    const resolvedSubtitle = subtitle ?? t('ctaBanner.defaultSubtitle')
    const resolvedButton = button ?? t('ctaBanner.defaultButton')

    return (
        <section className={`cta-wrap ${className}`.trim()}>
            <Box className="cta-banner">
                <Box className="cta-banner-text">
                    <Typography
                        sx={{
                            fontFamily: FONT,
                            fontWeight: 900,
                            fontSize: { xs: '1.5rem', md: '1.9rem' },
                            color: '#fff',
                            mb: 1,
                        }}
                    >
                        {resolvedTitle}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: FONT,
                            fontWeight: 500,
                            fontSize: '1.05rem',
                            color: 'rgba(255,255,255,0.85)',
                            maxWidth: 460,
                        }}
                    >
                        {resolvedSubtitle}
                    </Typography>
                </Box>

                <Box
                    component="img"
                    src={crateChar}
                    alt="AGA mascot carrying a crate of produce"
                    loading="lazy"
                    decoding="async"
                    className="cta-banner-mascot"
                />

                <Button
                    component={RouterLink}
                    to={to}
                    disableElevation
                    className="aga-btn cta-banner-btn"
                    endIcon={<ChevronRightIcon />}
                >
                    {resolvedButton}
                </Button>
            </Box>
        </section>
    )
}

export default CtaBanner