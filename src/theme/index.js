import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#00b581',
      contrastText: '#fff'
    },
    secondary: {
      main: '#006270'
    },
    background: {
      default: '#fff'
    },
    text: {
      primary: '#212427'
    },
    error: {
      main: '#ff0033'
    },
    action: {
      disabled: '#e8eaed'
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            height: 54
          },
          '& .MuiInputBase-root:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline':
            {
              borderColor: 'rgba(0, 0, 0, 0.23)'
            }
        }
      },
      defaultProps: {
        inputProps: {
          style: {
            padding: '15.5px 14px'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: 40,
          fontSize: 14,
          fontWeight: 500,
          padding: '0 24px 0 24px',
          borderRadius: 20,
          transition: 'none',
          textTransform: 'none'
        }
      },
      defaultProps: {
        disableElevation: true
      }
    }
  },
  spacing: 10
})

export default theme
