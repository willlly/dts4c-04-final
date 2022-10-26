import React, { useContext } from 'react';
import Box from '@mui/material/Box';

export const Footer = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 5, mb: 5 }}
            className="footer-text"
        >
            Copyright 2022 NEWS PORTAL
        </Box>
    );
};
