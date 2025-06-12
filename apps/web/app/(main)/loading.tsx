import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-neutral-800/30 flex-col space-y-2">
      {/* <div className="animate-spin bg-gradient-to-b from-stone-400/20 to-stone-600/20 w-10 h-10" />
      <p className='tracking-tighter'>loading...</p> */}
      <Image src={'/loading.webp'} alt='loading' width={200} height={500}/>
    </div>
  );
};

export default Loading;