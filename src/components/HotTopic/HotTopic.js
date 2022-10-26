import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const HotTopic = (props) => {
    return (
        <>
            <div className="hot-title">Hot Topics</div>

            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row' }}>
                <div style={{ position: 'relative' }}>
                    <Link to={`/detail/${props.judul}`}>
                        <LazyLoadImage
                            alt=""
                            src={props.url}
                            effect="blur"
                            className="hot-image"
                        />

                        <div className="hot-article-title">{props.judul}</div>
                        <div className="hot-article-pubdate">
                            {props.tanggal}
                        </div>
                        <div className="hot-article-source">{props.oleh}</div>
                    </Link>
                </div>

                <div className="hot-desc" style={{ marginLeft: 50 }}>
                    {props.content} <br />
                    <Link to={`/detail/${props.judul}`}>
                        (...baca lebih lengkap)
                    </Link>
                </div>
            </Box>
        </>
    );
};
