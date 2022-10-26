import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { signingIn } from '../utils/firebase/signin';
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
import { auth } from '../utils/firebase/base';
import { sendPasswordResetEmail } from 'firebase/auth';

export const SignIn = () => {
    const { setUser } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const triggerResetEmail = async () => {
        if (email !== '') {
            sendPasswordResetEmail(auth, email)
                .then(function () {
                    // Email sent.
                    setStatus('EMAIL_SUCCESS');
                    console.log('Password reset email sent');
                })
                .catch(function (error) {
                    // An error happened.
                    setStatus('EMAIL_FAILED');
                    console.log(error);
                });
        } else {
            setStatus('EMAIL_FAILED');
        }
    };

    const prosesSignIn = async () => {
        const signedIn = await signingIn(email, password);
        if (!signedIn.message) {
            setUser(signedIn.accessToken);
            setStatus('SUCCESS');
        } else {
            if (signedIn.message === 'Firebase: Error (auth/wrong-password).') {
                setStatus('WRONG');
            } else if (
                signedIn.message === 'Firebase: Error (auth/user-not-found).' ||
                signedIn.message === 'Firebase: Error (auth/invalid-email).'
            ) {
                setStatus('NOT FOUND');
            }
            console.log(signedIn.message);
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
                        Selamat Datang di News Portal
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

                        {status === 'WRONG' ? (
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                Email/password Anda salah
                            </Alert>
                        ) : (
                            <></>
                        )}

                        {status === 'NOT FOUND' ? (
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                Email Anda tidak ditemukan
                            </Alert>
                        ) : (
                            <></>
                        )}

                        {status === 'EMAIL_SUCCESS' ? (
                            <Alert severity="success">
                                <AlertTitle>Success</AlertTitle>
                                Silakan cek email Anda untuk reset password
                            </Alert>
                        ) : (
                            <></>
                        )}

                        {status === 'EMAIL_FAILED' ? (
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                Harap input email Anda terlebih dahulu
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
                            onClick={prosesSignIn}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    href="#"
                                    onClick={triggerResetEmail}
                                    variant="body2"
                                >
                                    Lupa password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    Belum punya akun? Daftar di sini
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default SignIn;
