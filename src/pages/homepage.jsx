import { Grid2, Link, Paper } from '@mui/material'

function Homepage() {
  return (
    <Grid2 container px={1.6} py={2.4}>
      <Grid2>
        <Paper sx={{ p: 1.6, borderRadius: '1rem' }}>
          <Link href="/simulador-vivienda">Simulador</Link>
        </Paper>
      </Grid2>
    </Grid2>
  )
}

export default Homepage
