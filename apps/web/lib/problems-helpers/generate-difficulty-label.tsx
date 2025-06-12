import { DifficultyCategory } from "@repo/types/problem";
import { number } from "zod";


const DifficultyLabel = (
    { difficulty
    }: {
        difficulty?: number | DifficultyCategory
    }) => {

    let diff = 'from-lime-300/60 to-green-50 dark:from-lime-300 dark:to-green-500 border-green-300/40 text-green-700';
    if ( typeof difficulty === 'number' ) {
        if(difficulty > 1400){
            diff = "from-orange-300/50 to-orange-50 border-orange-300/40 text-orange-500/60  dark:from-orange-300 dark:to-orange-500";
        }
        else if(difficulty>2000){
            diff = "from-red-300/50 to-red-50 border-red-300/40 text-red-500/60";
        }
    }
    else {
        if(difficulty===DifficultyCategory.MEDIUM){
            diff="from-orange-300/50 to-orange-50 border-orange-300/40 text-orange-500/60  dark:from-orange-300 dark:to-orange-500";
        }
        else if(difficulty===DifficultyCategory.HARD){
            diff="from-red-300/50 to-red-50 border-red-300/40 text-red-500/60 dark:from-red-300 dark:to-red-500";
        }
    }

    return (
        <div>
            <p className={`text-xs font-medium border-[1px] bg-gradient-to-b  w-fit h-fit rounded-md px-1.5 font-(family-name:--font-inter) dark:text-white dark:border-0 ${diff}`}>{difficulty}</p>
        </div>
    )
};

export default DifficultyLabel;