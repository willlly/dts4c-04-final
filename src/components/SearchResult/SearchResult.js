import React, { useContext, useState, useEffect } from 'react';
import { Nav } from '../Nav/Nav';
import { ThemeContext } from '../utils/theme-context';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { Grid, Box } from '@mui/material';
import { NewsCard } from '../NewsCard/NewsCard';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { Footer } from '../Footer/Footer';

const SearchResult = () => {
    const theme = useContext(ThemeContext);
    const [dataNews, setDataNews] = useState();
    let { searchtext } = useParams();

    function formatCreator(input) {
        var output;
        if (input) {
            output = input[0];
        } else {
            output = 'Anonymous';
        }
        return output;
    }

    function formatImageUrl(input) {
        var output;
        if (input) {
            output = input;
        } else {
            output = '/assets/404.jpg';
        }
        return output;
    }

    function formatTitle(input) {
        var output;
        if (input) {
            var temptitle = input;
            var maxLength = 85; //dibatasi 85 char
            var trimmedTitle =
                temptitle.length > maxLength
                    ? temptitle.substring(0, maxLength - 3) + '...'
                    : temptitle;

            output = trimmedTitle;
        } else {
            output = '';
        }
        return output;
    }

    useEffect(() => {
        axios
            .get(
                'https://newsdata.io/api/1/news?language=en&apikey=' +
                    process.env.REACT_APP_NEWSDATA_API_KEY2 +
                    '&q=' +
                    searchtext
            )
            .then(({ data }) => {
                var textData = '{ "results" : [';
                for (let i = 0; i < data.results.length; i++) {
                    var tempCreator = formatCreator(data.results[i].creator);
                    var tempUrl = formatImageUrl(data.results[i].image_url);
                    var tempTitle = formatTitle(data.results[i].title);
                    var tempDate = data.results[i].pubDate;

                    if (i === data.results.length - 1) {
                        textData +=
                            '{ "creator":"' +
                            tempCreator +
                            '" , "url":"' +
                            tempUrl +
                            '" , "title":"' +
                            tempTitle +
                            '" , "date":"' +
                            tempDate +
                            '" } ]}';
                    } else {
                        textData +=
                            '{ "creator":"' +
                            tempCreator +
                            '" , "url":"' +
                            tempUrl +
                            '" , "title":"' +
                            tempTitle +
                            '" , "date":"' +
                            tempDate +
                            '" },';
                    }
                }

                setDataNews(JSON.parse(textData));
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
                        Hasil Pencarian: {searchtext}
                    </Typography>
                </Breadcrumbs>
            </Box>
            <h1
                className="latest-title"
                style={{ marginLeft: 35, marginTop: 20 }}
            >
                Hasil Pencarian: {searchtext}
            </h1>

            <div style={{ marginLeft: 35 }}>
                <Grid container>
                    {dataNews ? (
                        dataNews.results.map((singleData, index) => (
                            <NewsCard
                                key={index}
                                url={singleData.url}
                                judul={singleData.title}
                                tanggal={singleData.date}
                                oleh={singleData.creator}
                            />
                        ))
                    ) : (
                        <Skeleton
                            animation="wave"
                            variant="rectangular"
                            width={700}
                            height={331}
                        />
                    )}
                </Grid>
            </div>
            <Footer />
        </div>
    );
};

export default SearchResult;
