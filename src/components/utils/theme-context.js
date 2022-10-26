import { createContext } from 'react';

export const theme = {
    light: {
        background: '#E5E5E5',
        color: '#121221',
    },

    dark: {
        background: '#222222',
        color: '#F8F8F8',
    },
};

export const ThemeContext = createContext(theme.light);
