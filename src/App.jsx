import { Routes, Route } from 'react-router-dom';
import { DesktopLayout } from './components/Layout';
import Home from './components/Home';
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
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
