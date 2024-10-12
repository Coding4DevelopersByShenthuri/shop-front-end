import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import MyFooter from './components/MyFooter';
import 'flowbite';

function App() {
  return (
    <>
      {/* Main content with Navbar, Routes, and Footer */}
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
        <MyFooter />
      </div>
    </>
  );
}

export default App;

