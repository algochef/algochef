import React from 'react'
import {
  BookOpen,
  UserCheck,
  Calendar,
  Code,
  Award,
  Users,
} from "lucide-react"


const features = [
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: "Curated DSA Sheets",
    description:
      "Master algorithms with hand-picked problems from LeetCode 150, Blind 75, Striver's SDE sheet, and more. Progress tracking included.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <UserCheck className="h-8 w-8" />,
    title: "Company-Wise Problems",
    description:
      "Practice problems asked by FAANG and top tech companies. Filter by company, difficulty, and topic for targeted preparation.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: <Calendar className="h-8 w-8" />,
    title: "Contest Tracker",
    description:
      "Never miss a coding contest with our comprehensive calendar. Set reminders and access post-contest editorials.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: <Code className="h-8 w-8" />,
    title: "Online IDE",
    description:
      "Write, test, and share code in 15+ languages. Built-in templates, syntax highlighting, and collaborative features.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Performance Analytics",
    description:
      "Track your progress with detailed analytics. Visualize your growth across different algorithms and data structures.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Community & Profiles",
    description:
      "Share your journey with customizable profiles. Connect with other competitive programmers and showcase your achievements.",
    gradient: "from-teal-500 to-blue-500",
  },
]

const FeatureCards = () => {
  return (
    <div className='grid grid-cols-3 px-10 gap-2 my-4'>
      {features.map((feature, index) => (
        <div className='hover:shadow-md rounded-sm transition-all transform ease-in-out duration-300 dark:bg-gradient-to-tl dark:from-blue-700/10 dark:to-gray-950/10'>
          <div className={`bg-gradient-to-br ${feature.gradient} rounded-sm p-1 text-gray-50 w-fit m-4`}>{feature.icon}</div>
          <h6 className='text-sm sm:text-base md:text-xl  tracking-tighter font-semibold mx-4'>{feature.title}</h6>
          <p className='text-gray-500 mx-4 mb-4 text-xs md:text-sm lg:text-base'>{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

export default FeatureCards