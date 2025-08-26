import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import StudyMaterials from "./pages/StudyMaterials";
import MockTests from "./pages/MockTests";
import SubjectChapters from "./pages/SubjectChapters";
import ChapterQuestions from "./pages/ChapterQuestions";
import ProgressPage from "./pages/ProgressPage";
import CommunityForum from "./pages/CommunityForum";
import AccountSettings from "./pages/AccountSettings";
import SignOut from "./pages/SignOut";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/materials" element={<StudyMaterials />} />
        <Route path="/mock-tests" element={<MockTests />} />
        <Route path="/mock-tests/:subject" element={<SubjectChapters />} />
        <Route path="/mock-tests/:subject/:chapter" element={<ChapterQuestions />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/communityforum" element={<CommunityForum />} />
        <Route path="/account" element={<AccountSettings />} />
        <Route path="/signout" element={<SignOut />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
