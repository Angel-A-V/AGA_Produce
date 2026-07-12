import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import crateChar from '../assets/products/crate_char.webp'
import './Buttons.css'
import './CtaBanner.css'

const FONT = 'Nunito, sans-serif'

function CtaBanner({
    title = 'Ready to order fresh?',
    subtitle = "Tell us what your business needs and we'll get you set up with a quote, fast.",
    button = 'Contact Us',
    to = '/contact',
    className = '',
}) {
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
                        {title}
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
                        {subtitle}
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
                    {button}
                </Button>
            </Box>
        </section>
    )
}

export default CtaBanner