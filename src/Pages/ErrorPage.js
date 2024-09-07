import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#111827]">
      <div className="text-center">
        <h1 className="text-white text-6xl font-bold mb-4">404 Page Not Found</h1>
        <Link to="/">
          <button className="mt-4 px-6 py-3 bg-[#6363c3] text-white rounded hover:bg-[#5252a6] focus:outline-none">
            Go to Home Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
