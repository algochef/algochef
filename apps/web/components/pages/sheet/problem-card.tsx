import CustomLabel from '@/components/ui/custom-label'
import DifficultyLabel from '@/lib/problems-helpers/generate-difficulty-label'
import { CompanyTag, DifficultyCategory, Problem, Tag } from '@repo/types/problem'
import { Circle, CircleCheckBig } from 'lucide-react'
import React from 'react'

const ProblemCard = ({
    problem,
    toggleSolveStatus
}: {
    problem: Problem,
    toggleSolveStatus: (problemSlug: string) => void
}) => {
    return (
        <div className="flex flex-col border-[1px] rounded border-gray-100 dark:border-neutral-800 p-3  w-full justify-center">
            <div className="flex space-x-2 items-center">
                {/* <Circle size={18}/> */}
                {problem.solved ?
                    <CircleCheckBig
                        size={18}
                        className="text-green-500"
                        onClick={() => toggleSolveStatus(problem.slug)}
                    /> :
                    <Circle
                        size={18}
                        className="text-green-500"
                        onClick={() => toggleSolveStatus(problem.slug)}
                    />}
                <h2 className="md:text-md tracking-tight font-semibold">{problem.title}</h2>
                <DifficultyLabel difficulty={problem.difficultyCategory || problem.difficultyNumeric} />
            </div>
            <div className='flex space-x-2 my-2'>
                {problem && problem.companyTags && problem.companyTags.map((tag, idx) => {
                    if (idx > 3 || !problem || !problem.companyTags) return;
                    else if (idx == 3) {
                        return <CustomLabel title={`+${(problem.companyTags.length - idx).toString()}`} key={tag.slug} />
                    }
                    return <CustomLabel title={tag.name} key={tag.slug} />
                })}
            </div>
        </div>
    )
}

export default ProblemCard