import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";

import { Login } from "./api";
import { useNavigate } from "react-router-dom";

const LoginScreen = (props) => {
    const { setAccess, setAuthUser } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        Login({ email, password }).then((res) => {
            setAuthUser(email);
            localStorage.setItem("user", email);

            setAccess(res.data.data);
            localStorage.setItem("access", res.data.data);
            navigate("/home");
        });
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
            <Grid item xs={12} sm={6} md={4}>
                <Paper style={{ padding: 20 }}>
                    <Typography variant="h5" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            type="password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: 10 }}
                        >
                            Login
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default LoginScreen;
