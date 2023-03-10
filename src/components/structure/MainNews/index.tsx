import React, { useEffect, useState } from 'react';
import News from '../../../actions/News';
import { NewsI } from '../../../interfaces/News';
import NewsCard from '../NewsCard';

const MainNews: React.FC = () => {
    const [news, setNews] = useState<NewsI[]>([]);

    const getAllNews = () => {
        News.getAllId()
            .then((res) => {
                const newsIds = res.slice(0, 100);
                const promises: Promise<NewsI>[] = [];

                for (const id of newsIds) {
                    const promise = News.getNews(id);
                    promises.push(promise);
                }

                Promise.all(promises)
                    .then((news) => {
                        setNews(news);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAllNews();
        const interval = setInterval(() => {
            getAllNews();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="MainNews">
            <button className="MainNews__RefreshButton" onClick={getAllNews}>
                Refresh
            </button>
            {news?.length > 0 ? (
                news?.map((el) => <NewsCard key={el.id} news={el} />)
            ) : (
                <div className="MainNews__Loading">Loading...</div>
            )}
        </div>
    );
};

export default MainNews;
