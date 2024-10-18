import { Box, Container, MenuItem, Paper, TextField } from '@mui/material'
import { useState } from 'react'
import SimulationBBVA from '../components/simulation/simulation-bbva'

function Simulation() {
  const [simulator, setSimulator] = useState('general')

  return (
    <Box px={1.6} py={2.4}>
      <Container maxWidth="xl">
        <Paper sx={{ borderRadius: '8px' }}>
          <Box display="flex" flexDirection="column" gap={2.4} p={2}>
            <Box>
              <TextField
                select
                name="simulator"
                label="Simulador"
                value={simulator}
                onChange={e => setSimulator(e.target.value)}
                fullWidth
              >
                <MenuItem value="general">Simulador general</MenuItem>
                <MenuItem value="bbva">Simulador BBVA</MenuItem>
              </TextField>
            </Box>
            <Box>
              {simulator === 'bbva' ? <SimulationBBVA /> : <Box>General</Box>}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default Simulation
