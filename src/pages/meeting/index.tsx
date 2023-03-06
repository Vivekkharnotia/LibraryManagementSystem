import { ThemeProvider } from '@mui/material'
import Meeting from 'components/general/Meeting/Meeting'
import generateMuiTheme from "../../../components/general/Meeting/mui/theme";
import React from 'react'

const index = () => {
  return (
    <>
    <ThemeProvider theme={generateMuiTheme()}>
      <Meeting />
    </ThemeProvider>
    </>
  )
}

export default index