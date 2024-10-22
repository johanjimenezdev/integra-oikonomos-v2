import {
  Autocomplete,
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
import { formatter, findClosest } from './functions'

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
  const [errors, setErrors] = useState({
    houseVal: '',
    creditVal: '',
    term: '',
    subproduct: '',
    holders: '',
    nameHolder1: '',
    nidHolder1: '',
    birthHolder1: '',
    typeHolder1: '',
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
  const [roster, setRoster] = useState(false)
  const [results, setResults] = useState({
    line: '',
    anualRate: '',
    effortRate: ''
  })

  const handleChange = e => {
    setData(data => ({
      ...data,
      [e.target.name]: e.target.value
    }))
  }

  const handleErrors = () => {
    if (results.line === 'HIPOTECARIO TRADICIONAL UVR' && data.term > 240) {
      setErrors(prev => ({
        ...prev,
        term: 'El plazo máximo para este subproducto son 300 meses si el buro es menor o igual a 707, si el buro es mayor o igual a 708 el plazo máximo es de 360 meses'
      }))
    } else if (data.term > 240) {
      setErrors(prev => ({
        ...prev,
        term: 'El plazo en este subproducto no puede superar los 240 meses'
      }))
    } else {
      setErrors(prev => ({
        ...prev,
        term: ''
      }))
    }
  }

  const searchConsideration = salary => {
    const table = [
      { key: 0, vale: 0.58 },
      { key: 1.5, value: 0.64 },
      { key: 2.17, value: 0.7 }
    ]
    return findClosest(table, salary)
  }

  const handleSimulation = () => {
    // Línea de financiación
    setResults(prev => ({
      ...prev,
      line: `${subproductsBbva[data.subproduct].line} ${subproductsBbva[data.subproduct].subline} ${subproductsBbva[data.subproduct].amortization}`
    }))

    handleErrors()

    const salaryRange =
      data.fixedHolder1 < 5500000
        ? 'Menor a 5,5 M'
        : data.fixedHolder1 >= 5500000 && data.fixedHolder1 < 15000000
          ? 'Entre 5,5 y 15 M'
          : 'Más de 15 M'
    const salary = formatter.format(
      (Number(data.fixedHolder1) +
        Number(data.variableAHolder1) +
        Number(data.variableNAHolder1)) /
        1300000
    )
    const consideration =
      subproductsBbva[data.subproduct].amortization === 'UVR'
        ? searchConsideration(salary)
        : 0.7

    // Pricing
    const pricingId =
      subproductsBbva[data.subproduct].line === 'LEASING NO FAMILIAR' ||
      subproductsBbva[data.subproduct].line === 'LEASING'
        ? `LEASING HABITACIONAL${data.situationHolder1}${data.buroHolder1}${data.term <= 180 ? '<=180' : '>180'}${salaryRange}`
        : `${subproductsBbva[data.subproduct].line}${data.situationHolder1}${data.buroHolder1}${data.term <= 180 ? '<=180' : '>180'}${salaryRange}`

    // Tasa efectiva anual final
    if (
      (subproductsBbva[data.subproduct].line === 'HIPOTECARIO' ||
        subproductsBbva[data.subproduct].line === 'HIPOTECARIO VIS') &&
      subproductsBbva[data.subproduct].price === 'PRICING'
    ) {
      setResults(prev => ({ ...prev, anualRate: pricingBbva[pricingId].rate }))
    } else if (
      (subproductsBbva[data.subproduct].line === 'LEASING NO FAMILIAR' ||
        subproductsBbva[data.subproduct].line === 'LEASING') &&
      subproductsBbva[data.subproduct].price === 'PRICING'
    ) {
      setResults(prev => ({ ...prev, anualRate: pricingBbva[pricingId].rate }))
    } else if (subproductsBbva[data.subproduct].price === 'TASA FIJA') {
      setResults(prev => ({
        ...prev,
        anualRate: subproductsBbva[data.subproduct].unifiedRate
      }))
    } else {
      setResults(prev => ({
        ...prev,
        anualRate: 0
      }))
    }

    // Tasa de esfuerzo
    const effortRate = formatter.format(
      (Number(data.feeHolder1) +
        Number(data.mortgageHolder1) +
        Number(data.cardHolder1) * 0.05) /
        (Number(data.fixedHolder1) -
          Number(data.deductionsHolder1) +
          (Number(data.variableAHolder1) + Number(data.variableNAHolder1)) *
            0.85)
    )
    setResults(prev => ({
      ...prev,
      effortRate: effortRate < 0.2 ? 0.2 : effortRate
    }))

    // Balance de caja
    const cashBalance =
      (Math.round(consideration - effortRate) > 0.5
        ? formatter.format(0.5)
        : formatter.format(Math.round(consideration - effortRate)) *
          (Number(data.fixedHolder1) -
            Number(data.deductionsHolder1) +
            (Number(data.variableAHolder1) + Number(data.variableNAHolder1)) *
              0.85)) < 0
        ? 0
        : Math.round(consideration - effortRate) *
          (Number(data.fixedHolder1) -
            Number(data.deductionsHolder1) +
            (Number(data.variableAHolder1) + Number(data.variableNAHolder1)) *
              0.85)

    console.log(cashBalance)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Grid2 container spacing={4.8}>
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
                error={Boolean(errors.term)}
                helperText={errors.term}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Autocomplete
                disablePortal
                value={data.subproduct}
                onChange={(_, value) =>
                  handleChange({ target: { name: 'subproduct', value: value } })
                }
                options={subproductOptionsBbva}
                renderInput={params => (
                  <TextField {...params} label="Subproducto" fullWidth />
                )}
              />
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
          <Box display="flex" justifyContent="center" sx={{ my: 2.2 }}>
            <img src={logo} alt="bbva-logo" width={100} />
          </Box>
          <Grid2 container spacing={1.6}>
            <Grid2 size={12}>
              <TextField
                select
                name="roster"
                label="Portafolio (Cliente ya tiene cuenta de nómina y/o se compromete a aperturarla)"
                value={roster}
                onChange={e => setRoster(e.target.value)}
                fullWidth
              >
                <MenuItem value={true}>Sí</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </TextField>
            </Grid2>
            {results.line && (
              <Grid2 size={12}>
                <Typography>{results.line}</Typography>
              </Grid2>
            )}
            <Grid2 size={12} display="flex" flexDirection="column">
              <Box display="flex" gap={1}>
                <Typography>Tasa efectiva anual final:</Typography>
                <Typography>
                  {roster && results.anualRate
                    ? results.anualRate - 1
                    : results.anualRate}
                </Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Typography>Tasa de esfuerzo:</Typography>
                <Typography>{results.effortRate}</Typography>
              </Box>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </LocalizationProvider>
  )
}

export default SimulationBBVA
