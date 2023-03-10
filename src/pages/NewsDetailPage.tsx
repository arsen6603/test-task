import React from 'react';
import AppLayout from "../components/layouts/AppLayout";
import NewsDetail from "../components/structure/NewsDetail";

const NewsDetailPage = () => {
    return (
        <AppLayout title='Новость'>
            <NewsDetail/>
        </AppLayout>
    );
};

export default NewsDetailPage;