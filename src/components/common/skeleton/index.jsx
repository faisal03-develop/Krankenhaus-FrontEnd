import React from 'react';

const Skeleton = ({ type = 'default', rows = 3 }) => {
  const shimmer = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]';

  if (type === 'table') {
    return (
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b">
          <div className={`h-6 w-48 rounded ${shimmer}`}></div>
        </div>
        <div className="p-6">
          {[...Array(rows)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 mb-4">
              <div className={`h-10 w-10 rounded-full ${shimmer}`}></div>
              <div className="flex-1 space-y-2">
                <div className={`h-4 w-3/4 rounded ${shimmer}`}></div>
                <div className={`h-3 w-1/2 rounded ${shimmer}`}></div>
              </div>
              <div className={`h-6 w-16 rounded-full ${shimmer}`}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className={`h-6 w-3/4 rounded mb-4 ${shimmer}`}></div>
        <div className={`h-4 w-full rounded mb-2 ${shimmer}`}></div>
        <div className={`h-4 w-2/3 rounded mb-4 ${shimmer}`}></div>
        <div className={`h-8 w-24 rounded ${shimmer}`}></div>
      </div>
    );
  }

  return (
    <div className="pt-20 animate-pulse">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="mb-4">
          <div className={`h-4 rounded ${shimmer} ${i === 0 ? 'w-3/4' : i === rows - 1 ? 'w-1/2' : 'w-full'}`}></div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;