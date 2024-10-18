import { Box, Grid2, MenuItem, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import CurrencyInput from '../ui/currency-input'
import CustomInput from '../ui/custom-input'
import { bbvaSubproducts } from './data'
import logo from '../../assets/bbva-logo.svg'

function SimulationBBVA() {
  const [data, setData] = useState({
    houseVal: '',
    creditVal: '',
    term: '',
    subproduct: ''
  })

  const handleChange = e => {
    setData(data => ({
      ...data,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Grid2 container spacing={2.4}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Box mb={1.6}>
          <Typography fontWeight={500}>Información solicitud</Typography>
        </Box>
        <Grid2 container spacing={1.6}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <CurrencyInput
              name="houseVal"
              label="Valor del inmueble"
              value={data.houseVal}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <CurrencyInput
              name="creditVal"
              label="Valor del préstamo"
              value={data.creditVal}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <CustomInput
              type="number"
              name="term"
              label="Plazo (meses)"
              value={data.term}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              select
              name="subproduct"
              label="Subproducto"
              value={data.subproduct}
              onChange={handleChange}
              fullWidth
            >
              {bbvaSubproducts.map(subprod => (
                <MenuItem key={subprod} value={subprod}>
                  {subprod}
                </MenuItem>
              ))}
            </TextField>
          </Grid2>
        </Grid2>
      </Grid2>

      <Grid2 size={{ xs: 12, md: 6 }}>
        <Box display="flex" justifyContent="center" mb={2.4}>
          <img src={logo} alt="bbva-logo" width={100} />
        </Box>
        <Grid2 container spacing={1.6}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography>Tasa efectiva anual final:</Typography>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  )
}

export default SimulationBBVA
