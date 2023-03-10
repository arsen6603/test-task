import React, {useEffect, useState} from 'react';
import {NewsI} from '../../../interfaces/News';
import News from '../../../actions/News';
import {useNavigate, useParams} from 'react-router-dom';
import {Comment} from '../../../interfaces/Comment';
import CommentCard from '../CommentCard';
import {timeConverter} from '../../../utils/timeConverter';

const NewsDetail: React.FC = () => {
    const [news, setNews] = useState<NewsI | null>(null);
    const [comments, setComments] = useState<Comment[]>();

    const {id} = useParams();
    const navigate = useNavigate();

    const getAllComments = () => {
        News.getNews(Number(id)).then((res: NewsI) => {
            setNews(res);
            const promises: Promise<Comment>[] = [];

            if (res?.kids?.length > 0) {
                for (const id of res.kids) {
                    const promise = News.getComments(id);
                    promises.push(promise);
                }

                Promise.all(promises)
                    .then((comments: Comment[]) => {
                        setComments(comments);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        }).catch((err: Error) => {
            console.log(err);
        });
    };

    const backToHome = () => {
        navigate('/');
    };

    useEffect(() => {
        getAllComments();
    }, []);

    return (
        <div className="NewsDetail">
            <div className="NewsDetail__Header">
                <p className="NewsDetail__Title">{news?.title}</p>
                <a className="NewsDetail__Link" href={news?.url}>
                    {news?.url}
                </a>
                <p className="NewsDetail__Date">
                    Published: {news?.time ? timeConverter(news?.time) : null}
                </p>
                <p className="NewsDetail__Author">Author: {news?.by}</p>
            </div>
            <button onClick={getAllComments} className="NewsDetail__RefreshButton">
                Refresh Comments
            </button>
            <button onClick={backToHome} className="NewsDetail__Navigate">
                Back to News
            </button>
            <div className="NewsDetail__CommentsCount">
                Comments: {news?.descendants}
            </div>
            <div className="NewsDetail__Comments">
                {comments?.map(
                    (el: Comment) =>
                        !el?.deleted && <CommentCard key={el.id} comment={el}/>
                )}
            </div>
        </div>
    );
};

export default NewsDetail;