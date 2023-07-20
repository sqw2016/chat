import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '@/pages/home';

const renderRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default renderRouter;