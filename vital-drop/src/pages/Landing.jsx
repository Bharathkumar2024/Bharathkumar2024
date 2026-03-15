import { Box, Container, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import AccessCard from '../shared/AccessCard.jsx'
import AnimatedBackground from '../shared/AnimatedBackground.jsx'

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  letterSpacing: '0.02em',
  textShadow: '0 0 12px rgba(255,0,0,0.75), 0 0 24px rgba(255,0,0,0.35)',
  animation: 'vitalBlink 1.6s infinite',
  '@keyframes vitalBlink': {
    '0%, 100%': { color: '#ff4d4d' },
    '50%': { color: '#ff1a1a' },
  },
}))

const Subtitle = styled(Typography)(({ theme }) => ({
  color: 'rgba(255,255,255,0.9)',
  maxWidth: 840,
  marginInline: 'auto',
}))

export default function Landing() {
  const navigate = useNavigate()

  return (
    <Box sx={{ position: 'relative', minHeight: '100dvh', overflow: 'hidden', background: 'radial-gradient(1200px 800px at 20% 20%, rgba(255,0,0,0.18), transparent), radial-gradient(1000px 700px at 80% 0%, rgba(255,0,0,0.22), transparent), linear-gradient(180deg, #1a0000 0%, #330000 100%)' }}>
      <AnimatedBackground />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
          <Title variant="h2" sx={{ fontSize: { xs: 36, md: 56 } }}>Vital Drop</Title>
          <Subtitle variant="h6" sx={{ mt: 2 }}>
            Connecting hospitals, donors, and blood banks to save lives in real time.
          </Subtitle>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <AccessCard
              title="Hospitals"
              description="Admitted patients, blood requests, analytics"
              emoji="🏥"
              onClick={() => navigate('/auth/hospital')}
              glowColor="#ff4d4d"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AccessCard
              title="Donors"
              description="Respond to emergencies, track donations"
              emoji="🩸"
              onClick={() => navigate('/auth/donor')}
              glowColor="#ff6666"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AccessCard
              title="Blood Banks"
              description="Inventory, shipments, compliance & safety logs"
              emoji="🏬"
              onClick={() => navigate('/auth/bloodbank')}
              glowColor="#ff3333"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
