import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";

import { Login, SignUp } from "./api";
import { toaster } from "./utils/toast.util";
import { useNavigate } from "react-router-dom";

const SignUpScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");

    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
        // Add your login logic here

        SignUp({ email, password, username }).then(() => {
            toaster({ type: "success", message: "User signup success" });

            navigate("/login");
        });
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
            <Grid item xs={12} sm={6} md={4}>
                <Paper style={{ padding: 20 }}>
                    <Typography variant="h5" gutterBottom>
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="User Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
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
                            Submit
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default SignUpScreen;
