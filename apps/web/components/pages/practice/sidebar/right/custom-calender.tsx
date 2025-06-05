import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import Image from 'next/image';


// -1 last month
// 1 solved
// 2 today
// 3 havent solved
// 4 future
const CALENDAR = [
  [[-1, 28], [-1, 29], [-1, 30], [-1, 31], [1, 1], [1, 2], [1, 3]],
  [[1, 4], [3, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10]],
  [[1, 11], [1, 12], [3, 13], [1, 14], [3, 15], [2, 16], [4, 17]],
  [[4, 18], [4, 19], [4, 20], [4, 21], [4, 22], [4, 23], [4, 24]],
  [[4, 25], [4, 26], [4, 27], [4, 28], [4, 29], [4, 30], [4, 31]],
];

const CustomCalender = () => {
  return (
    <div className='shadow-md pt-4 rounded-md bg-gray-50 dark:bg-neutral-800/30'>
      <div className='flex justify-between px-4'>
        <IconChevronLeft className='border-2 rounded-md' />
        <h1 className='font-semibold text-sm'>June 2025</h1>
        <IconChevronRight className='border-2 rounded-md' />
      </div>
      <table className="w-full text-center text-gray-500 my-4 px-2">
        <thead>
          <tr>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody className='font-(family-name:--font-inter) text-sm tracking-tighter'>
          {CALENDAR.map((week, i) => (
            <tr key={i} className=''>
              {week.map((day, j) => (
                <td key={j} className='p-1 w-15 h-10 my-2 cursor-pointer'>
                  {day[0] === -1 && <span></span>}
                  {day[0] === 1 && (
                    <Image
                      width={40}
                      height={40}
                      alt="Flame"
                      src="/icons/flame.svg"
                      className='bg-orange-200/50 dark:bg-orange-300/20 flex items-center justify-center rounded-full p-1'
                    />
                  )}
                  {day[0] === 2 && <span>{day[1]}</span>}
                  {day[0] === 3 && <span className='text-black dark:text-white'>{day[1]}</span>}
                  {day[0] === 4 && <span className=' text-gray-400'>{day[1]}</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='w-full h-[1px] bg-gray-300/40 dark:bg-gray-600/40 mb-2'></div>
      <div className='flex justify-between items-center text-xs px-2 bg-gradient-to-b from-base via-orange-200/80 to-orange-400/80 dark:via-orange-400/20 dark:to-orange-800/60 rounded-md w-full py-4'>
        <div className='flex items-center flex-col justify-center'>
          <h4>Current Streak</h4>
          <div className='flex space-x-2 items-center justify-center'>
            <Image
              width={20}
              height={20}
              alt="Flame"
              src="/icons/flame.svg"
            />
            <p className='text-sm'>1</p>
          </div>
        </div>
        <div className='flex items-center flex-col'>
          <h4>Max. Streak</h4>
          <div className='flex space-x-2 items-center justify-center'>
            <Image
              width={16}
              height={16}
              alt="Awards"
              src="/icons/award.svg"
            />
            <p className='text-sm'>7</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CustomCalender