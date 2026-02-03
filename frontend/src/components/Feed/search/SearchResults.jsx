import React from 'react';
import { IoClose } from "react-icons/io5";
import UserCard from './UserCard';

const SearchResults = ({ results, onClear }) => {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className='w-full px-6 pb-6 overflow-scroll max-h-[calc(100vh-10rem)]'>
      <div className='max-w-6xl mx-auto'>
        {/* Results Header */}
        <div className='mb-6 flex items-center justify-between flex-wrap gap-4 text-theme-white'>
          <div>
            <h2 className='text-2xl font-bold mb-1'>
              Found {results.length} {results.length === 1 ? 'match' : 'matches'}
            </h2>
            <p className='text-sm '>
              Click on a card to view full profile
            </p>
          </div>
          
          <button
            onClick={onClear}
            className='px-4 py-2 rounded-full bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 transition-all duration-200 text-sm flex items-center gap-2 border border-green-500/30 hover:border-green-400/40'
          >
            <IoClose className='text-lg' />
            Clear Search
          </button>
        </div>

        {/* Results Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {results.map((user, index) => (
            <UserCard 
              key={user.id || user._id || user.username || index} 
              user={user}
              index={index}
            />
          ))}
        </div>

        {/* Pagination hint (if you add pagination later) */}
        {results.length >= 20 && (
          <div className='mt-8 text-center'>
            <p className='text-green-400/60 text-sm'>
              Showing first {results.length} results
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;