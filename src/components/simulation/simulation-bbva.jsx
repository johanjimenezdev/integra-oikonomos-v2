import {
  Autocomplete,
  Box,
  Button,
  Grid2,
  MenuItem,
  Paper,
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
import { formatter, findClosest, PAGO } from './functions'

const MIN_SALARY = 1300000

function SimulationBBVA() {
  const [process, setProcess] = useState({
    done: false,
    loading: false
  })
  const [data, setData] = useState({
    roster: false,
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
  const [errors, setErrors] = useState({})
  const [results, setResults] = useState({
    line: '',
    anualRate: '',
    effortRate: '',
    cashBalance: '',
    monthlyFee: '',
    capacity: '',
    lawCI: '',
    lawDG: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setData(prevData => ({
      ...prevData,
      [name]: value
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

  const getConsideration = salary => {
    const table = [
      { key: 0, vale: 0.58 },
      { key: 1.5, value: 0.64 },
      { key: 2.17, value: 0.7 }
    ]
    return findClosest(table, salary)
  }

  const handleSimulation = () => {
    setProcess({ done: false, loading: true })
    const {
      fixedHolder1,
      variableAHolder1,
      variableNAHolder1,
      deductionsHolder1,
      situationHolder1,
      buroHolder1,
      term,
      feeHolder1,
      mortgageHolder1,
      cardHolder1,
      creditVal,
      houseVal
    } = data
    const { line, subline, amortization } = subproductsBbva[data.subproduct]

    //* Línea de financiación
    setResults(prev => ({
      ...prev,
      line: `${line} ${subline} ${amortization}`
    }))

    handleErrors()

    // Determinar rango salarial
    const salaryRange =
      fixedHolder1 < 5500000
        ? 'Menor a 5,5 M'
        : fixedHolder1 < 15000000
          ? 'Entre 5,5 y 15 M'
          : 'Más de 15 M'

    // Calcular salario
    const salary = formatter.format(
      (Number(fixedHolder1) +
        Number(variableAHolder1) +
        Number(variableNAHolder1)) /
        MIN_SALARY
    )

    // Consideración
    const consideration =
      amortization === 'UVR' ? getConsideration(salary) : 0.7

    // Pricing
    const leasingPrefix =
      line === 'LEASING NO FAMILIAR' || line === 'LEASING'
        ? 'LEASING HABITACIONAL'
        : line
    const pricingId = `${leasingPrefix}${situationHolder1}${buroHolder1}${term <= 180 ? '<=180' : '>180'}${salaryRange}`

    //* Tasa efectiva anual final
    const calculateAnualRate = () => {
      const { line, price, unifiedRate } = subproductsBbva[data.subproduct]
      const isPricing = price === 'PRICING'
      const isHipotecario = line === 'HIPOTECARIO' || line === 'HIPOTECARIO VIS'
      const isLeasing = line === 'LEASING' || line === 'LEASING NO FAMILIAR'

      if (isPricing && (isHipotecario || isLeasing)) {
        return pricingBbva[pricingId].rate
      } else if (price === 'TASA FIJA') {
        return unifiedRate
      } else {
        return 0
      }
    }

    //* Tasa de esfuerzo
    const calculateEffortRate = () => {
      const totalIncome = fixedHolder1 - deductionsHolder1
      const totalVariable = (variableAHolder1 + variableNAHolder1) * 0.85
      const totalExpenses = feeHolder1 + mortgageHolder1 + cardHolder1 * 0.05
      const effortRate = totalExpenses / (totalIncome + totalVariable)
      return Math.max(effortRate, 0.2)
    }

    //* Balance de caja
    const calculateCashBalance = () => {
      const diff = consideration - effortRate
      let round = Math.min(diff, 0.5)
      round = Math.round(round * 100) / 100
      const sum =
        fixedHolder1 -
        deductionsHolder1 +
        (variableAHolder1 + variableNAHolder1) * 0.85

      if (round * sum < 0) {
        return 0
      }

      return round * sum
    }

    //* Cuota mensual sin seguros sin cobertura en pesos
    const calculateMonthlyFee = rate => {
      const mv = Math.pow(1 + rate / 100, 30 / 360) - 1 // * 100
      // const mi = Math.round((data.creditVal * mv) / 100)
      return Math.round(
        -PAGO(mv, data.term, data.creditVal, -(data.creditVal * 0.01))
      )
    }

    //* Capacidad de pago
    const calculateCapacity = (balance, fee) => {
      if (fee === 0) {
        return 'Falta cuota solicitada'
      }

      const result = Math.trunc((balance / fee) * 100) / 100

      if (result < 1 || result === 1) {
        return 'INSUFICIENTE'
      } else if (result > 1 && result < 1.1) {
        return 'JUSTA'
      } else if (result > 1.099) {
        return 'SUFICIENTE'
      }
    }

    const anualRate = calculateAnualRate()
    const effortRate = calculateEffortRate()
    const cashBalance = calculateCashBalance()
    const monthlyFee = calculateMonthlyFee(anualRate)
    const capacity = calculateCapacity(cashBalance, monthlyFee)
    const lawCI = (
      (monthlyFee / (fixedHolder1 + variableAHolder1 + variableNAHolder1)) *
      100
    ).toFixed(2)
    const lawDG = ((creditVal / houseVal) * 100).toFixed(2)

    setResults(prev => ({
      ...prev,
      effortRate,
      anualRate,
      cashBalance,
      monthlyFee,
      capacity,
      lawCI,
      lawDG
    }))
    setProcess({ done: true, loading: false })
  }

  const formFields = {
    solicitud: [
      { name: 'houseVal', label: 'Valor del inmueble' },
      { name: 'creditVal', label: 'Valor del préstamo' },
      {
        name: 'term',
        label: 'Plazo (meses)',
        type: 'number',
        error: Boolean(errors.term),
        helperText: errors.term
      }
    ],
    titular: [
      { name: 'nameHolder1', label: 'Nombre' },
      { name: 'nidHolder1', label: 'Cédula', type: 'number' }
    ],
    financials: [
      { name: 'fixedHolder1', label: 'Ingresos fijos' },
      {
        name: 'variableNAHolder1',
        label: 'Ingresos variables como NO autónomo'
      },
      { name: 'variableAHolder1', label: 'Ingresos variables como autónomo' },
      { name: 'deductionsHolder1', label: 'Deducciones de nómina' },
      { name: 'feeHolder1', label: 'Gastos cuota' },
      { name: 'mortgageHolder1', label: 'Gastos hipotecarios' },
      { name: 'cardHolder1', label: 'Cupos tarjetas' },
      { name: 'rentHolder1', label: 'Valor arriendo' }
    ],
    selectOptions: [
      {
        name: 'typeHolder1',
        label: 'Tipo de cliente',
        options: ['Tradicional', 'Premium']
      },
      {
        name: 'situationHolder1',
        label: 'Situación laboral',
        options: ['Asalariado', 'Independiente']
      },
      { name: 'buroHolder1', label: 'Buro', options: buroOptionsBbva }
    ]
  }

  return (
    <Grid2 container spacing={2.4}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Paper variant="outlined" sx={{ borderRadius: '8px' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <Grid2 container p={2.4}>
              <Grid2 size={{ xs: 12 }}>
                <Box mb={1.6}>
                  <Typography fontSize={22} fontWeight={400}>
                    Información solicitud
                  </Typography>
                </Box>
                <Grid2 container spacing={1.6}>
                  {formFields.solicitud.map(({ name, label, ...props }) => (
                    <Grid2 key={name} size={{ xs: 12, md: 6 }}>
                      {name === 'term' ? (
                        <CustomInput
                          {...props}
                          name={name}
                          label={label}
                          value={data[name]}
                          onChange={handleChange}
                        />
                      ) : (
                        <CurrencyInput
                          name={name}
                          label={label}
                          value={data[name]}
                          onChange={handleChange}
                        />
                      )}
                    </Grid2>
                  ))}

                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <Autocomplete
                      disablePortal
                      value={data.subproduct}
                      onChange={(_, value) =>
                        handleChange({ target: { name: 'subproduct', value } })
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
                      {Array.from({ length: 4 }, (_, i) => i + 1).map(
                        holder => (
                          <MenuItem key={holder} value={holder}>
                            {holder}
                          </MenuItem>
                        )
                      )}
                    </TextField>
                  </Grid2>
                </Grid2>

                <Box mt={2.4} mb={1.6}>
                  <Typography fontSize={22}>
                    Información primer titular
                  </Typography>
                </Box>

                <Grid2 container spacing={1.6}>
                  {formFields.titular.map(({ name, label, ...props }) => (
                    <Grid2 key={name} size={{ xs: 12, md: 6 }}>
                      <CustomInput
                        {...props}
                        name={name}
                        label={label}
                        value={data[name]}
                        onChange={handleChange}
                      />
                    </Grid2>
                  ))}

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

                  {formFields.selectOptions.map(({ name, label, options }) => (
                    <Grid2 key={name} size={{ xs: 12, md: 6 }}>
                      <TextField
                        select
                        name={name}
                        label={label}
                        value={data[name]}
                        onChange={handleChange}
                        fullWidth
                      >
                        {options.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid2>
                  ))}

                  {formFields.financials.map(({ name, label }) => (
                    <Grid2 key={name} size={{ xs: 12, md: 6 }}>
                      <CurrencyInput
                        name={name}
                        label={label}
                        value={data[name]}
                        onChange={handleChange}
                      />
                    </Grid2>
                  ))}
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
            </Grid2>
          </LocalizationProvider>
        </Paper>
      </Grid2>

      <Grid2 size={{ xs: 12, md: 6 }}>
        <Paper variant="outlined" sx={{ borderRadius: '8px', p: 2.4 }}>
          <Box display="flex" justifyContent="center" sx={{ mb: 2.4 }}>
            <img src={logo} alt="bbva-logo" width={100} />
          </Box>
          <Grid2 container spacing={1.6}>
            <Grid2 size={12}>
              <TextField
                select
                name="roster"
                label="Portafolio (Cliente ya tiene cuenta de nómina y/o se compromete a aperturarla)"
                value={data.roster}
                onChange={handleChange}
                disabled={!process.done}
                fullWidth
              >
                <MenuItem value={true}>Sí</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </TextField>
            </Grid2>

            {results.line && (
              <Grid2 size={12}>
                <Typography fontWeight={500} textAlign="center">
                  {results.line}
                </Typography>
              </Grid2>
            )}

            {process.done && (
              <Grid2 size={12} display="flex" flexDirection="column" gap={1}>
                {[
                  {
                    label: 'Tasa efectiva anual final:',
                    value:
                      data.roster && results.anualRate
                        ? `${results.anualRate - 1}%`
                        : `${results.anualRate}%`
                  },
                  {
                    label: 'Tasa de esfuerzo:',
                    value: `${results.effortRate}%`
                  },
                  {
                    label: 'Balance de caja:',
                    value: new Intl.NumberFormat('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                      minimumFractionDigits: 0
                    }).format(results.cashBalance)
                  },
                  {
                    label: 'Cuota mensual sin seguros sin cobertura en pesos:',
                    value: new Intl.NumberFormat('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                      minimumFractionDigits: 0
                    }).format(results.monthlyFee)
                  },
                  {
                    label: 'Dictamen capacidad de pago:',
                    value: results.capacity
                  },
                  {
                    label: 'Ley de Vivienda relación (cuota / ingresos):',
                    value: `${results.lawCI}%`
                  },
                  {
                    label: 'Ley de Vivienda relación (deuda / garantía):',
                    value: `${results.lawDG}%`
                  }
                ].map(({ label, value }) => (
                  <Typography key={label}>
                    {label}
                    <span
                      style={{
                        marginLeft: 16,
                        fontStyle: 'italic',
                        fontWeight: 500
                      }}
                    >
                      {value}
                    </span>
                  </Typography>
                ))}
              </Grid2>
            )}
          </Grid2>

          {process.done && (
            <>
              <Typography
                fontSize={12}
                fontStyle="italic"
                mt={4.8}
                sx={{ opacity: 0.5 }}
              >
                Valores aproximados, para mayor precisión utiliza el simulador
                de Excel*
              </Typography>
              <Typography
                fontSize={12}
                fontStyle="italic"
                sx={{ opacity: 0.5 }}
              >
                Continuamos en el desarrollo*
              </Typography>
            </>
          )}
        </Paper>
      </Grid2>
    </Grid2>
  )
}

export default SimulationBBVA
