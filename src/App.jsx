import { Routes, Route } from 'react-router-dom';
import { DesktopLayout } from './components/Layout';
import Home from './components/Home';
import InstituteProfessors from './components/InstituteProfessors';
import ProfessorProfile from './components/ProfessorProfile';
import Login from './components/Login';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DesktopLayout>
            <Home />
          </DesktopLayout>
        }
      />
      <Route
        path="/institute-professors"
        element={
          <DesktopLayout>
            <InstituteProfessors />
          </DesktopLayout>
        }
      />
      <Route
        path="/institute-professors/:slug"
        element={
          <DesktopLayout>
            <ProfessorProfile />
          </DesktopLayout>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
