import React from 'react';
import AppLayout from "../components/layouts/AppLayout";
import MainNews from "../components/structure/MainNews";

const MainPage = () => {
    return (
        <AppLayout title="Главная">
            <MainNews/>
        </AppLayout>
    );
};

export default MainPage;