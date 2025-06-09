import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, useTheme } from "./layouts/ThemeContext";
import Sidebar from "./layouts/Sidebar";
import Test from "./components/test"; 
import HomePage from "./components/HomePage";
import QuestionGenerator from "./components/QuestionGenerator";
import LabReportGenerator from "./components/Lab-Report/LabReportGenerator";
import PDFSummary from "./components/PDFSummary";
import EssayGenerator from "./components/EssayGenerator";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import TopicExplanation from "./components/TopicExplanation";
import StudyPlan from "./components/StudyPlan";
import Aboutme from "./components/About-me/Aboutme";
import ContactMe from "./components/About-me/ContactMe";
import ParaphrasingTool from "./components/Paraphrasing";
import LandingPage from "./components/LandingPage";
import AuthForm from "./components/AuthForm";
import { AuthProvider } from "./components/AuthContext";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <AuthProvider>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};
const MainApp = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`app ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <Sidebar />
      <main
        className={`text-align-center pt-0 ${
          isDarkMode ? "dark-mode" : "light-mode"
        }`}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/pdfToqa" element={<PrivateRoute><QuestionGenerator /></PrivateRoute>} />
          <Route path="/lab-report-generator" element={<PrivateRoute><LabReportGenerator /></PrivateRoute>} />
          <Route path="/pdf-summary" element={<PrivateRoute><PDFSummary /></PrivateRoute>} />
          <Route path="/eassy-generator" element={<PrivateRoute><EssayGenerator /></PrivateRoute>} />
          <Route path="/topic-explaination" element={<PrivateRoute><TopicExplanation /></PrivateRoute>} />
          <Route path="/paraphrase" element={<PrivateRoute><ParaphrasingTool /></PrivateRoute>} />
          <Route path="/study-plan-generator" element={<PrivateRoute><StudyPlan /></PrivateRoute>} />
          <Route path="/about-me" element={<PrivateRoute><Aboutme /></PrivateRoute>} />
          <Route path="/contact" element={<PrivateRoute><ContactMe /></PrivateRoute>} />
          <Route path="/submit" element={<PrivateRoute><Test /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

{/* Public route */}
<Route path="/firebaseAuth" element={<AuthForm />} />
        </Routes>
      </main>
    </div>
  );
};
export default App;
