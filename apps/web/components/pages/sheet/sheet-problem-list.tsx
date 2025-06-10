import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import React from 'react'
import ProblemCard from "./problem-card";
import { Section } from "@repo/types/problem";
import { Progress } from "@/components/ui/progress";
import { ChevronDownIcon } from "lucide-react";



const SheetProblemList = ({ sections, toggleSolveStatus }: { sections: Section[], toggleSolveStatus: (slug: string) => void }) => {
    return (
        <div className='flex-[3] border-[1px] bg-gray-100/20 dark:bg-neutral-800/30 rounded-md h-fit'>
            <Accordion
                type="multiple"
                className="w-full"
            >
                {sections && sections.length && sections.map(section => {
                    let totalProblems = 0;
                    let totalSolved = 0;
                    if (section.problems) {
                        for (const p of section.problems) {
                            if (p.solved) totalSolved += 1;
                            totalProblems += 1;
                        }
                    }
                    const progress = (totalProblems === 0 ? 0 : totalSolved / totalProblems) * 100;
                    return <AccordionItem value={section.title}>
                        <AccordionTrigger className="px-4 flex  justify-between">
                            <div>{section.title}</div>
                            <div className="flex w-[30%] justify-between items-center space-x-2">
                                <p>{totalSolved}/{totalProblems}</p>
                                <Progress value={progress} className="w-[90%]" />
                                <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance my-1 justify-center items-center px-4">
                            {section && section.problems && section.problems.map(problem => {
                                return <ProblemCard problem={problem} toggleSolveStatus={toggleSolveStatus} />
                            })}
                        </AccordionContent>
                    </AccordionItem>
                })}
            </Accordion>

        </div>
    )
}

export default SheetProblemList