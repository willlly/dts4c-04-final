import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Nav } from '../Nav/Nav';
import { useParams } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeContext } from '../utils/theme-context';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const Detail = () => {
    let { newsId } = useParams();
    const theme = useContext(ThemeContext);

    const [urlGambar, setUrlGambar] = useState('');
    const [judul, setJudul] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [oleh, setOleh] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        axios
            .get(
                'https://newsdata.io/api/1/news?q=' +
                    newsId +
                    '&apikey=' +
                    process.env.REACT_APP_NEWSDATA_API_KEY2
            )
            .then(({ data }) => {
                if (data.results.length <= 0) {
                    //not found
                    setOleh('');
                    setUrlGambar('/assets/404.jpg');
                    setContent('');
                    setJudul('');
                    setTanggal('');
                } else {
                    if (data.results[0].creator) {
                        setOleh(data.results[0].creator[0]);
                    } else {
                        setOleh('');
                    }

                    if (data.results[0].image_url) {
                        setUrlGambar(data.results[0].image_url);
                    } else {
                        setUrlGambar('/assets/404.jpg');
                    }

                    //ambil content dulu, jika kosong baru ambil description, jika kosong baru kosongkan
                    if (data.results[0].content) {
                        let content = data.results[0].content;

                        setContent(content);
                    } else {
                        if (data.results[0].description) {
                            let content = data.results[0].description;

                            setContent(content);
                        } else {
                            setContent('');
                        }
                    }

                    setJudul(data.results[0].title);
                    setTanggal(data.results[0].pubDate);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div
            style={{
                backgroundColor: theme.background,
                color: theme.color,
            }}
            className="overlay"
        >
            <Nav />

            <Box sx={{ ml: 15, mt: 2 }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        to="/"
                        variant="body2"
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        HOME
                    </Link>

                    <Typography
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: theme.color,
                        }}
                    >
                        {judul}
                    </Typography>
                </Breadcrumbs>
            </Box>

            <Container maxWidth="lg" sx={{ mt: 2 }}>
                <Box>
                    <LazyLoadImage
                        alt=""
                        src={urlGambar}
                        effect="blur"
                        className="detail-image"
                    />

                    <div className="detail-title">{judul}</div>
                    <div className="detail-pubdate">{tanggal}</div>
                    <div className="detail-source">{oleh}</div>

                    <Box sx={{ mt: 5 }}>
                        <div className="detail-content">{content}</div>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </div>
    );
};
