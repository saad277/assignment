import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme/index.js";

import Chat from "./Chat.jsx";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Chat />
      </ThemeProvider>
    </>
  );
}

export default App;
