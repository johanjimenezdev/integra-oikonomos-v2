import { Container, Grid2 } from '@mui/material'
import StatesCard from '../components/homepage/states-card'
import RealEstatesCardFront from '../components/homepage/real-estates-card-front'
import ConsumptionCardFront from '../components/homepage/consumption-card-front'
import OrderCardFront from '../components/homepage/order-card-front'
import InsureCardFront from '../components/homepage/insure-card-front'
import ReactCardFlip from 'react-card-flip'
import { useState } from 'react'
import RealEstatesCardBack from '../components/homepage/real-estates-card-back'

function Homepage() {
  const [flipRealEstates, setFlipRealEstates] = useState(false)

  return (
    <Container maxWidth="xl">
      <Grid2 container px={1.6} py={2.4} spacing={2.4}>
        <Grid2 size={{ xs: 12 }}>
          <StatesCard />
        </Grid2>
        <Grid2
          size={{ xs: 12, md: 6, lg: 3 }}
          onMouseEnter={() => setFlipRealEstates(true)}
          onMouseLeave={() => setFlipRealEstates(false)}
        >
          <ReactCardFlip
            isFlipped={flipRealEstates}
            flipDirection="vertical"
            flipSpeedBackToFront={0.5}
          >
            <RealEstatesCardFront />
            <RealEstatesCardBack />
          </ReactCardFlip>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
          <ConsumptionCardFront />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
          <OrderCardFront />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
          <InsureCardFront />
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default Homepage
