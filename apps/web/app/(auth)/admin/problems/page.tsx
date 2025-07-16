// import { SiteHeader } from "@/components/site-header";
import { Edit, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import googleIcon from "@/public/icons/companies/google.svg";
// import amazonIcon from "@/public/icons/companies/amazon.svg";

const PROBLEMS = [
  {
    url: "https://www.codechef.com/START188C/problems/YETMON",
    difficultyNumeric: 1375,
    title: "Yet Another Monster Problem",
    problemCode: "CCYETMON",
    platform: "CODECHEF",
    slug: "yet-another-monsters-problem",
    tags: [
      { name: "Greedy", slug: "greedy" },
      { name: "DFS", slug: "dfs" },
    ],
    companyTags: [{ name: "Google", slug: "google" }],
  },
  {
    url: "https://leetcode.com/problems/sorting-squares/",
    difficultyNumeric: 1200,
    title: "Sorting Squares",
    problemCode: "LCSORTSQR",
    platform: "LEETCODE",
    slug: "sorting-squares",
    tags: [
      { name: "Two Pointers", slug: "two-pointers" },
      { name: "Sorting", slug: "sorting" },
    ],
    companyTags: [{ name: "Amazon", slug: "amazon" }],
  },
  {
    url: "https://www.codeforces.com/problemset/problem/1234/B2",
    difficultyNumeric: 1600,
    title: "Social Network (easy version)",
    problemCode: "CF1234B2",
    platform: "CODEFORCES",
    slug: "social-network-easy",
    tags: [
      { name: "Implementation", slug: "implementation" },
      { name: "Data Structures", slug: "data-structures" },
    ],
    companyTags: [],
  },
  {
    url: "https://atcoder.jp/contests/abc300/tasks/abc300_c",
    difficultyNumeric: 1450,
    title: "Crisscross Grid",
    problemCode: "ABC300C",
    platform: "ATCODER",
    slug: "crisscross-grid",
    tags: [
      { name: "Simulation", slug: "simulation" },
      { name: "Matrices", slug: "matrices" },
    ],
    companyTags: [{ name: "Rakuten", slug: "rakuten" }],
  },
];

// const iconMap = {
//   google: googleIcon,
//   amazon: amazonIcon,
// };

const Problems = () => {
  return (
    <>
      {/* <SiteHeader title="Problems" /> */}
      <div className="flex flex-1 flex-col my-4">
        {PROBLEMS.map((problem) => {
          return (
            <div
              key={problem.slug}
              className="grid grid-cols-6 space-x-3 px-4 rounded-md border-2 border-gray-500/10"
            >
              <div className="flex flex-col space-y-1">
                <h2 className="text-sm font-semibold">{problem.title}</h2>
                {
                  <>
                    {problem.companyTags.map((tag) => {
                      return (
                        <p
                          key={tag.slug}
                          className="text-sm tracking-tighter  bg-gray-400/20 rounded-lg px-2 py-1 text-gray-600 w-fit"
                        >
                          <span className="flex space-x-1">
                            {tag.slug === "google" && (
                              <Image
                                src={googleIcon}
                                width={15}
                                height={15}
                                alt="Google Icon"
                              />
                            )}
                            <p className="font-medium">{tag.name}</p>
                          </span>
                        </p>
                      );
                    })}
                  </>
                }
                {
                  <div className="flex">
                    {problem.tags.map((tag) => {
                      return (
                        <p
                          key={tag.slug}
                          className="text-sm tracking-tighter border-[2px] bg-gray-200/20 rounded-lg px-2 w-fit"
                        >
                          {tag.name}
                        </p>
                      );
                    })}
                  </div>
                }
              </div>
              <div>
                <h4 className="text-xs tracking-tighter">
                  {problem.problemCode}
                </h4>
              </div>
              <div>
                <p className="text-sm tracking-tighter border-[2px] bg-gray-200/20 rounded-lg px-2">
                  {problem.platform.toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-sm tracking-tighter border-[2px] bg-gray-200/20 rounded-lg px-2">
                  {problem.difficultyNumeric}
                </p>
              </div>

              <div>
                <p>
                  <Link
                    href={problem.url}
                    className="flex space-x-1 items-center text-xs px-2 py-1 bg-gray-950 w-fit text-gray-50 rounded"
                  >
                    <span>Open</span>
                    <ExternalLink size={15} />
                  </Link>
                </p>
              </div>
              <div>
                <Edit size={15} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Problems;
