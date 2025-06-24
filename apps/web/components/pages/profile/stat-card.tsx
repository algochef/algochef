import React from "react";

const StatCard = ({
  title,
  count,
  icon,
  className,
  iconStyle,
  countStyle,
  textStyle,
}: {
  title: string;
  count: number;
  icon?: React.ReactNode;
  className?: string;
  iconStyle?: string;
  countStyle?: string;
  textStyle?: string;
}) => {
  return (
    <div
      className={`w-full shadow h-full px-4 py-3  border-[1.2px] rounded-md flex space-x-4 items-center ${className}`}
    >
      <div className={`p-2 rounded-lg text-white w-fit h-fit ${iconStyle}`}>
        {icon}
      </div>
      <div>
        <h2 className={`tracking-tighter text-sm ${textStyle}`}>{title}</h2>
        <p className={`text-2xl font-bold tracking-tighter ${countStyle}`}>
          {count}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
