import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import theme from "./theme/index.js";

import Chat from "./Chat.jsx";
import Login from "./Login";
import SignUp from "./SignUp";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
    const [access, setAccess] = useState(false);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                {!access && (
                    <Routes>
                        <Route path={"/login"} element={<Login setAccess={setAccess} />} />
                        <Route path={"/register"} element={<SignUp />} />
                        <Route path="*" element={<Navigate to={"/login"} />} />
                    </Routes>
                )}

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

