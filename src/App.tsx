import { Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
