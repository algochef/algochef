"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel } from "@/components/ui/select";
import { fetchProblemData } from "@/lib/problems-helpers/fetch-problem-data";
import { SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Platform } from "@repo/types/contest";
import { DifficultyCategory, Problem } from "@repo/types/problem";
import { IconX } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MultipleTagsInput from "./multiple-tags-input";
import { submitProblem } from "@/lib/problems-helpers/submit-problem";
import { toast } from "sonner";

export function AddProblemModal() {
    const formRef = useRef<HTMLFormElement>(null);
    const [step, setStep] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [problemData, setProblemData] = useState<Problem>({
        title: "",
        companyTags: [],
        tags: [],
        difficultyCategory: DifficultyCategory.EASY,
        difficultyNumeric: undefined,
        problemCode: "",
        url: "",
        platform: Platform.CODEFORCES,
        slug: "",
    })


    const updateProblemData = async (problemUrl: string) => {
        setIsLoading(true);
        setProblemData(await fetchProblemData(problemUrl))
        setIsLoading(false);
    }

    const addProblem = async (problem: Problem) => {
        setIsLoading(true);
        const res = await submitProblem(problem);
        if (res.error) {
            toast.error("Something went wrong while adding the problem.");
        } else {
            toast.success("Problem added successfully!");
        }
        setIsLoading(false);
    }

    const onTagChange = (payload: { type: string, name: string, slug: string, tagType: string }) => {
        console.log(payload);
        setProblemData(prevState => {
            let newTags = payload.tagType === "topic" ? prevState.tags : prevState.companyTags;
            if (payload.type === "add") {
                if (newTags?.some(tag => tag.slug === payload.slug)) {
                    return prevState;
                }
                newTags?.push({
                    name: payload.name,
                    slug: payload.slug
                });
            }
            else {
                newTags = newTags?.filter(tag => tag.slug !== payload.slug);
                console.log(newTags);
            }
            if (payload.tagType === "topic") {
                return {
                    ...problemData,
                    tags: newTags
                }
            }
            else {
                return {
                    ...problemData,
                    companyTags: newTags,
                };
            }
        });
    }
    console.log(problemData);

    const parseProblemData = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);
        const parsedData = Object.fromEntries(formData.entries());
        console.log(parsedData);

        if (step == 1) {
            const problemUrl = parsedData.problem_url;
            // STEP 1: Parse the data from backend
            updateProblemData(problemUrl);
            setStep(2);
        }
        else {
            // STEP 2: Send the problem data to backend 
            setModalOpen(false);
            addProblem(problemData);
            setStep(1);
        }
    }

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                <Button className='w-full' onClick={() => {
                    if (!modalOpen) {
                        setModalOpen(true);
                        setStep(1);
                    }
                }}>Add A Problem</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a new problem</DialogTitle>
                    <DialogDescription>
                        Paste the problem URL and we will try to parse the problem details automatically.
                    </DialogDescription>
                </DialogHeader>
                <form ref={formRef} onSubmit={parseProblemData} className="my-3 flex flex-col space-y-3">

                    {/* Step 1 */}
                    {step == 1 ? <>

                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="problem_url">Problem URL</Label>
                                <Input id="problem_url" name="problem_url" placeholder="https://leetcode.com/problems/two-sum/" />
                            </div>
                        </div>

                    </> : <>
                        {isLoading ? <>
                            <div className="flex items-center justify-center">
                                <Loader2 className="animate-spin" />
                            </div>
                        </> : <>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="url">URL</Label>
                                    <Input id="url" name="url" placeholder="https://leetcode.com/problems/two-sum/" disabled defaultValue={problemData.url} className="text-sm" />
                                </div>
                            </div>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" name="title" defaultValue={problemData.title} className="text-sm" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="difficultyNumeric">Difficulty (Numeric)</Label>
                                    <Input id="difficultyNumeric" name="difficultyNumeric" defaultValue={problemData.difficultyNumeric} type="number" onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                                        if (!ev.target.value) {
                                            return;
                                        }
                                        setProblemData(prev => {
                                            return {
                                                ...prev,
                                                difficultyNumeric: parseInt(ev.target.value)
                                            }
                                        })
                                    }} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="difficultyNumeric">Difficulty (Category)</Label>
                                    <Select defaultValue={problemData.difficultyCategory} onValueChange={(diff: string) => {
                                        setProblemData(prev => {
                                            return {
                                                ...prev,
                                                difficultyCategory: diff as DifficultyCategory
                                            }
                                        })
                                    }}>
                                        <SelectTrigger className="w-full text-sm border-[1px] shadow rounded-md py-1">
                                            <SelectValue placeholder="Select difficulty" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Difficulty</SelectLabel>
                                                <SelectItem value="EASY">EASY</SelectItem>
                                                <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                                                <SelectItem value="HARD">HARD</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid gap-4">
                                <MultipleTagsInput tags={problemData.tags} onTagChange={onTagChange} />
                            </div>
                            <div className="grid gap-4">
                                <MultipleTagsInput tags={problemData.companyTags} onTagChange={onTagChange} tagType="company" />
                            </div>
                        </>}
                    </>}
                    <DialogFooter className="my-2">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">
                            {step === 1 ? "Next" : "Submit"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
