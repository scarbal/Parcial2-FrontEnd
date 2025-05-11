import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-xl">◆ Acme Co.</span>
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-100 px-3 py-1 rounded"
        />
      </div>
      <div className="flex items-center gap-4">
        <Link to="/signup">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
        </Link>
        <button className="bg-red-500 text-white px-4 py-2 rounded">New Project</button>
        <button className="bg-gray-200 px-4 py-2 rounded">Explore</button>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </header>
  );
};
