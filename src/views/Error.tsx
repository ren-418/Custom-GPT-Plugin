import React from 'react';

const Error: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-600">Page Not Found</p>
      <p className="text-gray-500 mt-2">The page you're looking for doesn't exist or has been moved.</p>
    </div>
  );
};

export default Error;