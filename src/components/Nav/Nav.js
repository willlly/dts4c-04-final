import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useDispatch } from 'react-redux';
import { yangDicari } from '../../store/features/searchArticleSlice';
import { changeMode } from '../../store/features/darkModeSlice';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '22ch',
            },
        },
    },
}));

export const Nav = () => {
    const navigate = useNavigate();
    const [cari, setCari] = useState('');
    const dispatch = useDispatch();

    const signOut = () => {
        localStorage.removeItem('access_token');
        dispatch(yangDicari(''));
        dispatch(changeMode('light'));

        navigate('/signin');
    };

    const searchingArticle = () => {
        dispatch(yangDicari(cari));

        navigate(`/result/${cari}`);
    };

    const changingMode = (value) => {
        if (value) {
            //dark mode
            dispatch(changeMode('dark'));
        } else {
            //light mode
            dispatch(changeMode('light'));
        }
    };

    return (
        <Box sx={{ flexGrow: 1, mt: 2 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        NEWS PORTAL
                    </Typography>
                    <Search sx={{ mr: 5 }}>
                        <StyledInputBase
                            placeholder="Cari..."
                            inputProps={{ 'aria-label': 'search' }}
                            value={cari}
                            onChange={(e) => setCari(e.target.value)}
                        />

                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            onClick={searchingArticle}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Search>

                    <Box sx={{ ml: 2, mr: 2 }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    color="default"
                                    onChange={(e) =>
                                        changingMode(e.target.checked)
                                    }
                                />
                            }
                            label="Dark Mode"
                        />
                    </Box>

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={signOut}
                    >
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
