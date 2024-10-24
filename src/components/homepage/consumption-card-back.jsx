import { Box, Paper } from '@mui/material'
import CardOption from './card-option'
import {
  FolderOutlined,
  PendingActionsOutlined,
  RequestQuoteOutlined
} from '@mui/icons-material'

function ConsumptionCardBack() {
  return (
    <Paper
      sx={{
        borderRadius: '1rem',
        '&:hover': {
          boxShadow:
            '0px 5px 5px -3px rgba(0, 181, 129, 0.2), 0px 8px 10px 1px rgba(0, 181, 129, 0.14), 0px 3px 14px 2px rgba(0, 181, 129, 0.12)'
        }
      }}
    >
      <Box
        display="flex"
        minHeight={250}
        flexDirection="column"
        justifyContent="center"
        p={2.4}
        gap={1.6}
      >
        <CardOption icon={<PendingActionsOutlined />} label="Solicitudes" />
        <CardOption icon={<RequestQuoteOutlined />} label="Reportes" />
        <CardOption icon={<FolderOutlined />} label="Documentos" />
      </Box>
    </Paper>
  )
}

export default ConsumptionCardBack
