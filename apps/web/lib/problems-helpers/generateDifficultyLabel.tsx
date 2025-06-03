import { DifficultyCategory } from "@repo/types/problem";
import { number } from "zod";


const DifficultyLabel = (
    { difficulty
    }: {
        difficulty?: number | DifficultyCategory
    }) => {

    let diff = 'from-green-300/50 to-green-50 border-green-300/40 text-green-700';
    if ( typeof difficulty === 'number' ) {
        if(difficulty > 1400){
            diff = "from-orange-300/50 to-orange-50 border-orange-300/40 text-orange-500/60";
        }
        else if(difficulty>2000){
            diff = "from-red-300/50 to-red-50 border-red-300/40 text-red-500/60";
        }
    }
    else {
        if(difficulty===DifficultyCategory.MEDIUM){
            diff="from-orange-300/50 to-orange-50 border-orange-300/40 text-orange-500/60";
        }
        else if(difficulty===DifficultyCategory.HARD){
            diff="from-red-300/50 to-red-50 border-red-300/40 text-red-500/60";
        }
    }

    return (
        <div>
            <p className={`text-xs font-medium border-[1px] bg-gradient-to-b  w-fit h-fit rounded-md px-1.5 font-(family-name:--font-inter) ${diff}`}>{difficulty}</p>
        </div>
    )
};

export default DifficultyLabel;