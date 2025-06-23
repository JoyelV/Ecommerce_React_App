import Sidebar from '../components/common/Sidebar.tsx';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="home-content">
        <h2>Product Listing Page</h2>
        <p>Placeholder for product listings (to be implemented).</p>
      </div>
    </div>
  );
};

export default Home;
