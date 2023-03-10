import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import NewsDetailPage from "./pages/NewsDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
