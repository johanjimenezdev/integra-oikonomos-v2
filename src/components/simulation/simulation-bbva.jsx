import {
  Box,
  Button,
  Grid2,
  MenuItem,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import CurrencyInput from '../ui/currency-input'
import CustomInput from '../ui/custom-input'
import {
  subproductOptionsBbva,
  buroOptionsBbva,
  subproductsBbva,
  pricingBbva
} from './data'
import logo from '../../assets/bbva-logo.svg'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/es'

function SimulationBBVA() {
  const [data, setData] = useState({
    houseVal: '',
    creditVal: '',
    term: '',
    subproduct: '',
    holders: 1,
    nameHolder1: '',
    nidHolder1: '',
    birthHolder1: dayjs(),
    typeHolder1: 'Tradicional',
    situationHolder1: '',
    buroHolder1: '',
    fixedHolder1: '',
    variableNAHolder1: '',
    variableAHolder1: '',
    deductionsHolder1: '',
    feeHolder1: '',
    mortgageHolder1: '',
    cardHolder1: '',
    rentHolder1: ''
  })

  const handleChange = e => {
    setData(data => ({
      ...data,
      [e.target.name]: e.target.value
    }))
  }

  const handleSimulation = () => {
    const houseVal = data.houseVal.replace(/\$|\./g, '')
    const creditVal = data.creditVal.replace(/\$|\./g, '')
    const fixedHolder1 = data.fixedHolder1.replace(/\$|\./g, '')
    data.variableNAHolder1.replace(/\$|\./g, '')
    data.variableAHolder1.replace(/\$|\./g, '')
    data.deductionsHolder1.replace(/\$|\./g, '')
    data.feeHolder1.replace(/\$|\./g, '')
    data.mortgageHolder1.replace(/\$|\./g, '')
    data.cardHolder1.replace(/\$|\./g, '')
    data.rentHolder1.replace(/\$|\./g, '')

    const salaryRange =
      fixedHolder1 < 5500000
        ? 'Menor a 5,5 M'
        : fixedHolder1 >= 5500000 && fixedHolder1 < 15000000
          ? 'Entre 5,5 y 15 M'
          : 'Más de 15 M'
    const pricingId = `${subproductsBbva[data.subproduct].line}${data.situationHolder1}${data.buroHolder1}${data.term <= 180 ? '<=180' : '>180'}${salaryRange}`

    if (
      (subproductsBbva[data.subproduct].line === 'HIPOTECARIO' ||
        subproductsBbva[data.subproduct].line === 'HIPOTECARIO VIS') &&
      subproductsBbva[data.subproduct].price === 'PRICING'
    ) {
      console.log('x')
    } else if (
      (subproductsBbva[data.subproduct].line === 'LEASING NO FAMILIAR' ||
        subproductsBbva[data.subproduct].line === 'LEASING') &&
      subproductsBbva[data.subproduct].price === 'PRICING'
    ) {
      console.log('y')
    } else if (subproductsBbva[data.subproduct].price === 'TASA FIJA') {
      console.log(subproductsBbva[data.subproduct].unifiedRate)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
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
                {subproductOptionsBbva.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                select
                name="holders"
                label="Titulares"
                value={data.holders}
                onChange={handleChange}
                disabled
                fullWidth
              >
                {Array.from({ length: 4 }, (_, i) => i + 1).map(holder => (
                  <MenuItem key={holder} value={holder}>
                    {holder}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
          </Grid2>

          <Box mt={2.4} mb={1.6}>
            <Typography fontWeight={500}>Información primer titular</Typography>
          </Box>
          <Grid2 container spacing={1.6}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <CustomInput
                name="nameHolder1"
                label="Nombre"
                value={data.nameHolder1}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <CustomInput
                type="number"
                name="nidHolder1"
                label="Cédula"
                value={data.nidHolder1}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <DatePicker
                name="birthHolder1"
                label="Fecha de nacimiento"
                value={data.birthHolder1}
                onChange={birthHolder1 =>
                  setData(prev => ({ ...prev, birthHolder1 }))
                }
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                select
                name="typeHolder1"
                label="Tipo de cliente"
                value={data.typeHolder1}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Tradicional">Tradicional</MenuItem>
                <MenuItem value="Premium">Premium</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                select
                name="situationHolder1"
                label="Situación laboral"
                value={data.situationHolder1}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Asalariado">Asalariado</MenuItem>
                <MenuItem value="Independiente">Independiente</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                select
                name="buroHolder1"
                label="Buro"
                value={data.buroHolder1}
                onChange={handleChange}
                fullWidth
              >
                {buroOptionsBbva.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <CurrencyInput
                name="fixedHolder1"
                label="Ingresos fijos"
                value={data.fixedHolder1}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <CurrencyInput
                name="variableNAHolder1"
                label="Ingresos variables como NO autónomo"
                value={data.variableNAHolder1}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <CurrencyInput
                name="variableAHolder1"
                label="Ingresos variables como autónomo"
                value={data.variableAHolder1}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <CurrencyInput
                name="deductionsHolder1"
                label="Deducciones de nómina"
                value={data.deductionsHolder1}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <CurrencyInput
                name="feeHolder1"
                label="Gastos cuota"
                value={data.feeHolder1}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <CurrencyInput
                name="mortgageHolder1"
                label="Gastos hipotecarios"
                value={data.mortgageHolder1}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <CurrencyInput
                name="cardHolder1"
                label="Cupos tarjetas"
                value={data.cardHolder1}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <CurrencyInput
                name="rentHolder1"
                label="Valor arriendo"
                value={data.rentHolder1}
                onChange={handleChange}
              />
            </Grid2>
          </Grid2>

          <Grid2 size={12} mt={2.4}>
            <Box display="flex" justifyContent="end">
              <Button
                type="button"
                onClick={handleSimulation}
                variant="contained"
              >
                Realizar simulación
              </Button>
            </Box>
          </Grid2>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box
            display="flex"
            justifyContent="center"
            mb={2.4}
            sx={{ mt: { xs: 2.4, md: 0 } }}
          >
            <img src={logo} alt="bbva-logo" width={100} />
          </Box>
          <Grid2 container spacing={1.6}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography>Tasa efectiva anual final:</Typography>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </LocalizationProvider>
  )
}

export default SimulationBBVA
