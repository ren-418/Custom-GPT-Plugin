import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-black">
      <Link to="/gpts" className="text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out cursor-pointer">
        GPTHub
      </Link>
    </div>
  );
};

export default Home;