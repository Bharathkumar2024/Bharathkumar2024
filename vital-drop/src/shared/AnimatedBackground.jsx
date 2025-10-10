import { Box, keyframes } from '@mui/material'

const drift = keyframes`
  0% { transform: translateY(0) translateX(0) scale(1) }
  50% { transform: translateY(-12px) translateX(8px) scale(1.02) }
  100% { transform: translateY(0) translateX(0) scale(1) }
`

const floatSlow = keyframes`
  0% { transform: translateX(-5%) }
  50% { transform: translateX(5%) }
  100% { transform: translateX(-5%) }
`

export default function AnimatedBackground() {
  return (
    <Box aria-hidden sx={{ position: 'absolute', inset: 0, zIndex: 1 }}>
      {/* Optional provided image layer if present in /public/assets/bg.jpg */}
      <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/red-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }} />

      {/* Glow orbs */}
      <Box sx={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', top: '10%', left: '10%', background: 'radial-gradient(circle at 30% 30%, rgba(255,90,90,0.6), rgba(255,90,90,0))', filter: 'blur(10px)', animation: `${drift} 9s ease-in-out infinite` }} />
      <Box sx={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', bottom: '8%', right: '15%', background: 'radial-gradient(circle at 40% 40%, rgba(255,40,40,0.6), rgba(255,40,40,0))', filter: 'blur(12px)', animation: `${drift} 12s ease-in-out infinite`, animationDelay: '0.6s' }} />

      {/* Wave bands */}
      <Box sx={{ position: 'absolute', left: '-10%', right: '-10%', bottom: 0, height: 160, background: 'linear-gradient(180deg, rgba(255,80,80,0.15), rgba(0,0,0,0))', filter: 'blur(8px)', transform: 'translateZ(0)', animation: `${floatSlow} 14s ease-in-out infinite` }} />
      <Box sx={{ position: 'absolute', left: '-10%', right: '-10%', bottom: 30, height: 140, background: 'linear-gradient(180deg, rgba(255,120,120,0.12), rgba(0,0,0,0))', filter: 'blur(10px)', transform: 'translateZ(0)', animation: `${floatSlow} 18s ease-in-out infinite`, animationDelay: '0.4s' }} />
      <Box sx={{ position: 'absolute', left: '-10%', right: '-10%', bottom: 60, height: 120, background: 'linear-gradient(180deg, rgba(255,150,150,0.1), rgba(0,0,0,0))', filter: 'blur(12px)', transform: 'translateZ(0)', animation: `${floatSlow} 22s ease-in-out infinite`, animationDelay: '0.8s' }} />
    </Box>
  )
}
