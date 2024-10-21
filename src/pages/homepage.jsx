import { Container, Grid2 } from '@mui/material'
import StatesCard from '../components/homepage/states-card'
import RealEstatesCardFront from '../components/homepage/real-estates-card-front'
import ConsumptionCardFront from '../components/homepage/consumption-card-front'
import OrderCardFront from '../components/homepage/order-card-front'
import InsureCardFront from '../components/homepage/insure-card-front'
import ReactCardFlip from 'react-card-flip'
import { useState } from 'react'
import RealEstatesCardBack from '../components/homepage/real-estates-card-back'
import OrderCardBack from '../components/homepage/order-card-back'
import InsureCardBack from '../components/homepage/insure-card-back'

function Homepage() {
  const [flipRealEstates, setFlipRealEstates] = useState(false)
  const [flipConsumption, setFlipConsumption] = useState(false)
  const [flipOrder, setFlipOrder] = useState(false)
  const [flipInsure, setFlipInsure] = useState(false)

  return (
    <Container maxWidth="2xl">
      <Grid2 container px={1.6} py={2.4} spacing={2.4}>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <StatesCard />
        </Grid2>
        <Grid2
          size={{ xs: 12, md: 6, lg: 2 }}
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
        <Grid2
          size={{ xs: 12, md: 6, lg: 2 }}
          onMouseEnter={() => setFlipConsumption(true)}
          onMouseLeave={() => setFlipConsumption(false)}
        >
          <ReactCardFlip
            isFlipped={flipConsumption}
            flipDirection="vertical"
            flipSpeedBackToFront={0.5}
          >
            <ConsumptionCardFront />
            <RealEstatesCardBack />
          </ReactCardFlip>
        </Grid2>
        <Grid2
          size={{ xs: 12, md: 6, lg: 2 }}
          onMouseEnter={() => setFlipOrder(true)}
          onMouseLeave={() => setFlipOrder(false)}
        >
          <ReactCardFlip
            isFlipped={flipOrder}
            flipDirection="vertical"
            flipSpeedBackToFront={0.5}
          >
            <OrderCardFront />
            <OrderCardBack />
          </ReactCardFlip>
        </Grid2>
        <Grid2
          size={{ xs: 12, md: 6, lg: 2 }}
          onMouseEnter={() => setFlipInsure(true)}
          onMouseLeave={() => setFlipInsure(false)}
        >
          <ReactCardFlip
            isFlipped={flipInsure}
            flipDirection="vertical"
            flipSpeedBackToFront={0.5}
          >
            <InsureCardFront />
            <InsureCardBack />
          </ReactCardFlip>
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default Homepage
