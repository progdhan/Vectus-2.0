import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import SubjectsPage     from './pages/SubjectsPage.jsx';
import TopicsPage       from './pages/TopicsPage.jsx';
import LessonDetailPage from './pages/LessonDetailPage.jsx';
import QuizPage         from './pages/QuizPage.jsx';
import ResultPage       from './pages/ResultPage.jsx';
import ProgressPage     from './pages/ProgressPage.jsx';
import OfflineBanner    from './components/OfflineBanner.jsx';

export default function App() {
  return (
    <HashRouter>
      <OfflineBanner />
      <Routes>
        <Route path="/"                   element={<SubjectsPage />}     />
        <Route path="/subject/:subjectId" element={<TopicsPage />}       />
        <Route path="/topic/:topicId"     element={<LessonDetailPage />} />
        <Route path="/quiz"               element={<QuizPage />}         />
        <Route path="/result"             element={<ResultPage />}       />
        <Route path="/progress"           element={<ProgressPage />}     />
        <Route path="*"                   element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
