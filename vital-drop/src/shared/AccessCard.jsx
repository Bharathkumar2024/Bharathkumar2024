import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const CardRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: 16,
  padding: '24px 28px',
  background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
  border: '1px solid rgba(255,255,255,0.15)',
  boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
  color: '#fff',
  cursor: 'pointer',
  transition: 'transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease',
  outline: 'none',
  userSelect: 'none',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
  '&:focus-visible': {
    boxShadow: '0 0 0 3px rgba(255, 77, 77, 0.5) inset',
  },
  '::before': {
    // wave layer
    content: '""',
    position: 'absolute',
    left: -20,
    right: -20,
    bottom: -10,
    height: 60,
    background: 'radial-gradient(70px 20px at 10% 60%, rgba(255,255,255,0.12), transparent 60%), radial-gradient(70px 20px at 40% 60%, rgba(255,255,255,0.12), transparent 60%), radial-gradient(70px 20px at 70% 60%, rgba(255,255,255,0.12), transparent 60%), radial-gradient(70px 20px at 100% 60%, rgba(255,255,255,0.12), transparent 60%)',
    filter: 'blur(8px)',
    transform: 'translateY(0)',
    animation: 'waveSlide 6s linear infinite',
    zIndex: 0,
  },
  '::after': {
    // arrow indicator
    content: '"➜"',
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: 'translateY(-50%)',
    opacity: 0,
    filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.6))',
    animation: 'blink 1.8s infinite',
    transition: 'opacity 250ms ease',
    pointerEvents: 'none',
  },
  '&:hover::after': { opacity: 1 },
  '@keyframes waveSlide': {
    '0%': { transform: 'translateX(-10%) translateY(0)' },
    '50%': { transform: 'translateX(10%) translateY(2px)' },
    '100%': { transform: 'translateX(-10%) translateY(0)' },
  },
  '@keyframes blink': {
    '0%, 100%': { opacity: 0.2 },
    '50%': { opacity: 1 },
  },
}))

export default function AccessCard({ title, description, emoji, onClick, glowColor = '#ff4d4d' }) {
  return (
    <CardRoot
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
      sx={{
        borderColor: 'rgba(255,255,255,0.2)',
        '&:hover': {
          boxShadow: `0 10px 40px rgba(0,0,0,0.35), 0 0 24px ${glowColor}55, 0 0 48px ${glowColor}33`,
          borderColor: `${glowColor}88`,
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 34 } }}>
          <span style={{ marginRight: 12 }}>{emoji}</span>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, color: 'rgba(255,255,255,0.85)' }}>
          {description}
        </Typography>
      </Box>
    </CardRoot>
  )
}
