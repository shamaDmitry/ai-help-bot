import React from "react";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadlineProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: Level;
  as?: `h${Level}`;
  className?: string;
  children: React.ReactNode;
}

const defaultStyles: Record<Level, string> = {
  1: "text-4xl font-extrabold leading-tight",
  2: "text-3xl font-bold leading-tight",
  3: "text-2xl font-semibold leading-snug",
  4: "text-xl font-medium leading-snug",
  5: "text-lg font-medium leading-snug",
  6: "text-base font-medium leading-normal",
};

export default function Headline({
  level = 1,
  as,
  className = "",
  children,
  ...rest
}: HeadlineProps) {
  const tag = (as ?? (`h${level}` as const)) as keyof JSX.IntrinsicElements;
  const Tag = tag as React.ElementType;

  const styles = defaultStyles[level];

  return (
    <Tag className={`${styles} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
