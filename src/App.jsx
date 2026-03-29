import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SubjectsPage     from './pages/SubjectsPage.jsx';
import TopicsPage       from './pages/TopicsPage.jsx';
import LessonDetailPage from './pages/LessonDetailPage.jsx';
import QuizPage         from './pages/QuizPage.jsx';
import ResultPage       from './pages/ResultPage.jsx';
import ProgressPage     from './pages/ProgressPage.jsx';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/"                   element={<SubjectsPage />}     />
        <Route path="/subject/:subjectId" element={<TopicsPage />}       />
        <Route path="/topic/:topicId"     element={<LessonDetailPage />} />
        <Route path="/quiz"               element={<QuizPage />}         />
        <Route path="/result"             element={<ResultPage />}       />
        <Route path="/progress"           element={<ProgressPage />}     />
        <Route path="*"                   element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
