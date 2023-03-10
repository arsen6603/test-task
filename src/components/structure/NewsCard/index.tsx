import React from 'react';
import {NewsI} from "../../../interfaces/News";
import {useNavigate} from 'react-router-dom'

interface Props {
    news: NewsI
}

const NewsCard: React.FC<Props> = ({news}) => {
    const navigate = useNavigate()

    const unixTime = news.time;
    const convertDate = new Date(unixTime * 1000)

    const day = convertDate.getDate()
    const month = (convertDate.getMonth() + 1)
    const year = convertDate.getFullYear();

    const date = `${day}-${month}-${year}`

    const openNews = (id: number) => {
        navigate(`/news/${id}`)
    }

    return (
        <div className="NewsCard" onClick={() => openNews(news.id)}>
            <p className="NewsCard__Title">{news.title}</p>
            <p><span className="NewsCard__GreenText">Author:</span> {news.by}</p>
            <div className="NewsCard__Footer">
                <p className="NewsCard__Rate"><span className="NewsCard__GreenText">Rate:</span> {news.score}</p>
                <p className="NewsCard__Date"> {date}
                    <img src="/icons/date.svg" alt="" width="15"/></p>
            </div>
        </div>
    );
};

export default NewsCard;