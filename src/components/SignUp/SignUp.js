import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { signingUp } from '../utils/firebase/signup';
import {
    Button,
    TextField,
    Grid,
    Container,
    Box,
    Typography,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const SignUp = () => {
    const { setUser } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const prosesSignUp = async () => {
        const response = await signingUp(email, password);

        if (!response.message) {
            setUser(response.accessToken);
            setStatus('SUCCESS');
        } else {
            if (
                response.message ===
                'Firebase: Error (auth/email-already-in-use).'
            ) {
                setStatus('ALREADY_EXIST');
            } else {
                setStatus('ERROR: ' + response.message);
            }
        }
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Pendaftaran Akun
                    </Typography>

                    <Box sx={{ mt: 3, mb: 1 }}>
                        {status === 'SUCCESS' ? (
                            <Alert severity="success">
                                <AlertTitle>Success</AlertTitle>
                                Silakan tunggu sebentar
                            </Alert>
                        ) : (
                            <></>
                        )}

                        {status === 'ALREADY_EXIST' ? (
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                Email Anda sudah terdaftar
                            </Alert>
                        ) : (
                            <></>
                        )}
                    </Box>

                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={prosesSignUp}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/signin" variant="body2">
                                    Sudah punya akun? Kembali ke login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default SignUp;
