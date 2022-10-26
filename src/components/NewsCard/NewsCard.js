import React from 'react';
import { Link } from 'react-router-dom';

export const NewsCard = (props) => {
    return (
        <div style={{ margin: 20, marginBottom: 35 }}>
            <Link to={`/detail/${props.judul}`}>
                <img src={props.url} alt="" className="newscard-image" />
                <div className="newscard-title" style={{ marginBottom: 10 }}>
                    {props.judul}
                </div>
            </Link>
            <div className="newscard-pubdate" style={{ marginRight: 25 }}>
                {props.tanggal}
            </div>
            <div className="newscard-source">{props.oleh}</div>
        </div>
    );
};
