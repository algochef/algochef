import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white flex-col space-y-2">
      <div className="animate-spin bg-gradient-to-b from-stone-400/20 to-stone-600/20 w-10 h-10" />
      <p className='tracking-tighter'>loading...</p>
    </div>
  );
};

export default Loading;