"use client";

import { IconStarFilled } from "@tabler/icons-react";
import React from "react";
import ProgressBar from "./progress";
import SheetProblemList from "./sheet-problem-list";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSheetSections } from "@/lib/problems-helpers/fetch-sheet-sections";
import { DifficultyCategory, Section, Sheet } from "@repo/types/problem";
import { Loader2, OctagonAlert } from "lucide-react";
import { usePathname } from "next/navigation";
import { signIn } from "next-auth/react";

const SheetDetails = ({
  slug,
  userToken,
}: {
  slug: string;
  userToken: string | undefined;
}) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const { data, isFetching, isError } = useQuery({
    queryKey: ["sheet", slug, userToken],
    queryFn: () => fetchSheetSections(slug, userToken),
  });

  if (isFetching) {
    return (
      <div className="m-auto">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className="m-auto">
        <OctagonAlert />
      </div>
    );
  }

  const toggleSolveStatus = (problemSlug: string) => {
    if (!userToken) {
      signIn(undefined, {
        callbackUrl: pathname || "/",
      });
      return;
    }
    queryClient.setQueryData(
      ["sheet", slug, userToken],
      (oldData: Sheet | undefined) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          section: oldData.section.map((section) => ({
            ...section,
            problems: section.problems.map((problem) =>
              problem.slug === problemSlug
                ? { ...problem, solved: !problem.solved }
                : problem,
            ),
          })),
        };
      },
    );
  };

  const problemsByDifficulty: Record<
    string,
    { solved: number; total: number }
  > = {
    [DifficultyCategory.EASY]: { solved: 0, total: 0 },
    [DifficultyCategory.MEDIUM]: { solved: 0, total: 0 },
    [DifficultyCategory.HARD]: { solved: 0, total: 0 },
  };

  let totalProblems = 0;

  for (const section of data.section) {
    for (const p of section.problems) {
      if (!p.difficultyCategory) continue;

      const cat = p.difficultyCategory;
      if (problemsByDifficulty[cat]) {
        problemsByDifficulty[cat].total += 1;
        if (p.solved) problemsByDifficulty[cat].solved += 1;
        totalProblems += 1;
      }
    }
  }

  const easyProblems = problemsByDifficulty[DifficultyCategory.EASY];
  const mediumProblems = problemsByDifficulty[DifficultyCategory.MEDIUM];
  const hardProblems = problemsByDifficulty[DifficultyCategory.HARD];

  return (
    <>
      <div className="rounded-md bg-gray-100/20 dark:bg-neutral-800/30 border-[1px]  flex-[1] h-fit">
        <div className="p-3">
          <div className="p-2 bg-gray-200 dark:bg-neutral-800 rounded w-fit my-3">
            <IconStarFilled size={40} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-balance">
              {data.title}
            </h1>
          </div>
          <div className="flex space-x-1 text-sm">
            <h3 className=" font-medium tracking-tight">
              {data.createdBy?.name}
            </h3>
            <span>·</span>
            <h4>{totalProblems} Questions</h4>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-11/12 h-[1px] bg-gray-500/30 my-4"></div>
        </div>
        <ProgressBar
          easy={easyProblems}
          medium={mediumProblems}
          hard={hardProblems}
          totalProblems={totalProblems}
        />
      </div>
      <SheetProblemList
        sections={data.section as Section[]}
        toggleSolveStatus={toggleSolveStatus}
      />
    </>
  );
};

export default SheetDetails;
