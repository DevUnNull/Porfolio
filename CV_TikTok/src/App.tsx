import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { FeedPage } from './pages/Home';

// The feed ships in the main bundle; every other page loads on demand.
const Explore = lazy(() => import('./pages/Explore').then((m) => ({ default: m.Explore })));
const Following = lazy(() => import('./pages/Following').then((m) => ({ default: m.Following })));
const Projects = lazy(() => import('./pages/Projects').then((m) => ({ default: m.Projects })));
const ProjectPage = lazy(() => import('./pages/Projects').then((m) => ({ default: m.ProjectPage })));
const Profile = lazy(() => import('./pages/Profile').then((m) => ({ default: m.Profile })));
const Play = lazy(() => import('./pages/Play').then((m) => ({ default: m.Play })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/Contact').then((m) => ({ default: m.NotFound })));

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

function PageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 pt-16 md:px-8 md:pt-8" aria-busy="true">
      <div className="skeleton h-8 w-56 rounded" />
      <div className="skeleton mt-3 h-4 w-80 max-w-full rounded" />
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="skeleton aspect-[3/4] rounded-md" />
        ))}
      </div>
    </div>
  );
}

const page = (el: React.ReactNode) => <Suspense fallback={<PageSkeleton />}>{el}</Suspense>;

export default function App() {
  return (
    <BrowserRouter basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<FeedPage feed="for-you" />} />
          <Route path="/@devunnull/video/:postId" element={<FeedPage feed="for-you" />} />
          <Route path="/development" element={<FeedPage feed="development" />} />
          <Route path="/skills" element={<FeedPage feed="skills" />} />
          <Route path="/explore" element={page(<Explore />)} />
          <Route path="/following" element={page(<Following />)} />
          <Route path="/projects" element={page(<Projects />)} />
          <Route path="/projects/:slug" element={page(<ProjectPage />)} />
          <Route path="/play/:slug" element={page(<Play />)} />
          <Route path="/@devunnull" element={page(<Profile />)} />
          <Route path="/profile" element={<Navigate to="/@devunnull" replace />} />
          <Route path="/contact" element={page(<Contact />)} />
          <Route path="*" element={page(<NotFound />)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
