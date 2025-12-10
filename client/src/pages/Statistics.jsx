import React from 'react';

const Statistics = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-10">Placement Statistics 2024</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="p-10 bg-blue-500 text-white rounded-2xl">
          <h2 className="text-5xl font-extrabold">95%</h2>
          <p className="mt-2 text-blue-100">Students Placed</p>
        </div>
        <div className="p-10 bg-green-500 text-white rounded-2xl">
          <h2 className="text-5xl font-extrabold">120+</h2>
          <p className="mt-2 text-green-100">Global Recruiters</p>
        </div>
        <div className="p-10 bg-indigo-500 text-white rounded-2xl">
          <h2 className="text-5xl font-extrabold">45 LPA</h2>
          <p className="mt-2 text-indigo-100">Highest Package</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;