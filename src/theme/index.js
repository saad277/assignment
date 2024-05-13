import { createTheme } from "@mui/material/styles";

import colors from "./colors";
import breakpoints from "./breakpoints";
import globals from "./globals";
import typography from "./typography";
import { pxToRem } from "./functions";

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  functions: {
    pxToRem,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
      },
    },
  },
});
