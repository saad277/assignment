import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import theme from "./theme/index.js";

import Chat from "./Chat.jsx";
import Login from "./Login";

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Login />

                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </ThemeProvider>
        </>
    );
}

export default App;

