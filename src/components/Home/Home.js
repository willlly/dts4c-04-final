import { Pagination, Stack } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import { Footer } from '../Footer/Footer';
import { HotTopic } from '../HotTopic/HotTopic';
import { NewsCard } from '../NewsCard/NewsCard';
import { Nav } from '../Nav/Nav';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../utils/theme-context';
import { Box, Grid } from '@mui/material';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';

export const Home = () => {
    const [halke, setHalke] = useState(1);
    const cariArtikel = useSelector((state) => state.searchArticle.value);
    const theme = useContext(ThemeContext);

    //untuk hot topic
    const [judul, setJudul] = useState('');
    const [oleh, setOleh] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [urlGambar, setUrlGambar] = useState('');
    const [content, setContent] = useState('');

    //untuk latest news
    const [dataNews, setDataNews] = useState();

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

    function formatDeskripsi(input) {
        var output;
        if (input) {
            var tempdeskripsi = input;
            var maxLength = 370; //dibatasi 370 char
            var trimmedDeskripsi =
                tempdeskripsi.length > maxLength
                    ? tempdeskripsi.substring(0, maxLength - 3) + '...'
                    : tempdeskripsi;

            output = trimmedDeskripsi;
        } else {
            output = '';
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
                'https://newsdata.io/api/1/news?country=us&language=en&category=technology&apikey=' +
                    process.env.REACT_APP_NEWSDATA_API_KEY2 +
                    '&page=' +
                    halke
            )
            .then(({ data }) => {
                const indexHot = 0;

                setOleh(formatCreator(data.results[indexHot].creator));
                setUrlGambar(formatImageUrl(data.results[indexHot].image_url));
                setContent(formatDeskripsi(data.results[indexHot].description));
                setJudul(formatTitle(data.results[indexHot].title));
                setTanggal(data.results[indexHot].pubDate);

                //karena i = 0 sudah dipakai untuk hot topics
                var textData = '{ "results" : [';
                for (let i = 1; i < data.results.length; i++) {
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
    }, [halke]);

    const handleChange = (event, value) => {
        setHalke(value);
    };

    return (
        <div
            style={{
                backgroundColor: theme.background,
                color: theme.color,
            }}
            className="overlay"
        >
            <Nav />

            <Box sx={{ mt: 5, ml: 5 }}>
                <HotTopic
                    judul={judul}
                    oleh={oleh}
                    tanggal={tanggal}
                    url={urlGambar}
                    content={content}
                />
            </Box>

            <h1
                className="latest-title"
                style={{ marginLeft: 35, marginTop: 50 }}
            >
                Latest News
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

            <Grid
                container
                justifyContent="center"
                className="pagination-background"
                sx={{ pt: 2, pb: 2 }}
            >
                <Stack spacing={2}>
                    <Pagination
                        count={20}
                        page={halke}
                        variant="outlined"
                        shape="rounded"
                        onChange={handleChange}
                    />
                </Stack>
            </Grid>

            <Footer />
        </div>
    );
};
