import { Box, Container, Grid2, Paper, TextField } from '@mui/material'
import { useState } from 'react'

function Simulation() {
  const [simulator, setSimulator] = useState()

  return (
    <Box px={1.6} py={2.4}>
      <Container maxWidth="xl">
        <Paper sx={{ borderRadius: '8px' }}>
          <Grid2 container p={2}>
            <Grid2 size={12}>
              <TextField select label="Simulador" fullWidth />
            </Grid2>
          </Grid2>
        </Paper>
      </Container>
    </Box>
  )
}

export default Simulation
