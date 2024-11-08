import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './views/layout/Layout';
import ContentLayout from './views/ContentLayout/ContentLayout';
const AuthView = lazy(() => import('./views/auth/Auth'));
const HomeView = lazy(() => import('./views/home/Home'));
const SearchView = lazy(() => import('./views/search/Search'));
const ChatView = lazy(() => import('./views/chat/Chat'));

export default function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={
          <Suspense>
            <AuthView />
          </Suspense>
        } />
        <Route path="/login" element={
          <Suspense>
            <AuthView />
          </Suspense>
        } />
        <Route element={<Layout />} >
          <Route element={<ContentLayout />} >
            <Route path="/" element={
              <Suspense>
                <HomeView />
              </Suspense>
            } index />
            <Route path="/search" element={
              <Suspense>
                <SearchView />
              </Suspense>
            } />
          </Route>
          <Route path="/chat" element={
            <Suspense>
              <ChatView />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}