import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'

const GREEN_DARK = '#2d5a1b'
const GOLD = '#c9a84c'
const TEXT_DARK = '#3d3228'
const FONT = 'Nunito, sans-serif'

function ProductCard({ title, items = [], image }) {
    return (
        <Card
            elevation={3}
            sx={{
                width: '100%',
                maxWidth: 340,
                borderRadius: 3,
                overflow: 'hidden',
                bgcolor: '#ffffff',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: 6,
                },
            }}
        >
            <Box sx={{ bgcolor: GREEN_DARK, py: 1.75, px: 2, textAlign: 'center' }}>
                <Typography
                    sx={{
                        fontFamily: FONT,
                        fontWeight: 800,
                        fontSize: '1.5rem',
                        color: '#fff',
                        letterSpacing: '0.02em',
                    }}
                >
                    {title}
                </Typography>
            </Box>

            {image && (
                <Box
                    component="img"
                    src={image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    sx={{
                        display: 'block',
                        width: '100%',
                        height: 170,
                        objectFit: 'cover',
                    }}
                />
            )}

            <Box sx={{ px: 2.5, py: 0.5 }}>
                {items.map((item, i) => {
                    const name = typeof item === 'string' ? item : item.name
                    const tag = typeof item === 'string' ? null : item.tag
                    return (
                        <Box key={name}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 1,
                                    py: 1.6,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: FONT,
                                        fontWeight: 700,
                                        fontSize: '1.05rem',
                                        color: TEXT_DARK,
                                    }}
                                >
                                    {name}
                                </Typography>
                                {tag && (
                                    <Chip
                                        label={tag}
                                        size="small"
                                        sx={{
                                            fontFamily: FONT,
                                            fontWeight: 700,
                                            fontSize: '0.75rem',
                                            color: GREEN_DARK,
                                            bgcolor: 'transparent',
                                            border: `1px solid ${GOLD}`,
                                        }}
                                    />
                                )}
                            </Box>
                            {i < items.length - 1 && (
                                <Divider sx={{ borderColor: '#ece5d5' }} />
                            )}
                        </Box>
                    )
                })}
            </Box>
        </Card>
    )
}

export default ProductCard