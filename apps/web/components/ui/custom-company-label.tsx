// "use client";

// import { CompanyTag } from '@repo/types/problem';
// import { IconChevronsDown, IconChevronsUp } from '@tabler/icons-react';
// import React, { useState } from 'react';

// const CustomCompanyLabels = ({ companyTags }: { companyTags: CompanyTag[] }) => {
//     const [expanded, setExpanded] = useState(false);
//     const toggleExpandOrCollapse = () => setExpanded(prev => !prev);

//     if (!companyTags || !companyTags.length) return null;

//     return (
//         <div className="relative my-2 w-full">
//             <div
//                 className={`flex flex-wrap gap-2 transition-max-height duration-300 ease-in-out overflow-hidden w-full`}
//                 style={{ maxHeight: expanded ? '1000px' : '30px' }}
//             >
//                 {companyTags.map(tag => (
//                     <h2
//                         key={tag.slug}
//                         className="text-sm tracking-tighter bg-gradient-to-t from-gray-300/50 to-gray-100/50 rounded-md px-2 py-0.5 text-gray-600 w-fit shadow border border-gray-200 h-fit dark:from-gray-700/50 dark:to-gray-900 dark:text-gray-50 dark:border-gray-200/10"
//                     >
//                         <span className="font-medium">{tag.name}</span>
//                     </h2>
//                 ))}
//             </div>

//             {/* Gradient overlay (adaptive background) */}
//             {!expanded && (
//                 <div className="absolute bottom-0 right-0 w-full h-8 bg-gradient-to-t from-[inherit] via-white/60 to-transparent pointer-events-none dark:via-gray-800/60" />
//             )}

//             {/* Expand/Collapse Button */}
//             <div
//                 className="flex items-center space-x-1 text-sm absolute right-0 bottom-0 cursor-pointer bg-white px-1 dark:bg-gray-900"
//                 onClick={toggleExpandOrCollapse}
//             >
//                 <span>{expanded ? "Collapse" : "Expand"}</span>
//                 {expanded ? <IconChevronsUp size={16} /> : <IconChevronsDown size={16} />}
//             </div>
//         </div>
//     );
// };

// export default CustomCompanyLabels;