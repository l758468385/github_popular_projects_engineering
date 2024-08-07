import React, { lazy, Suspense } from 'react';
import Nav from '@components/Nav';
import Loading from '@components/Loading';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const Popular = lazy(() => import('@/components/Popular'));
const Battle = lazy(() => import('@components/Battle'));
const Results = lazy(() => import('@components/Result'));
// 本次特性新增功能 1  2 3
export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Nav />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/popular" element={<Popular />} />
            <Route path="/battle" element={<Battle />} />
            <Route path="/results" element={<Results />} />
            <Route path="/" element={<Navigate to="/popular" />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
