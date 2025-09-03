import React from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type TitleProps = {
  as?: HeadingLevel;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

/**
 * Title
 * - `as` selects which heading tag to render (h1..h6). Default: h1
 * - `className` can override or extend default styles
 * - forwards other native heading props (id, style, aria-*, etc.)
 */

const Title = ({ as, className = "", children, ...rest }: TitleProps) => {
  const Tag: React.ElementType = (as || "h1") as React.ElementType;

  const defaultClasses: Record<HeadingLevel, string> = {
    h1: "text-4xl font-semibold mb-3",
    h2: "text-3xl font-semibold mb-3",
    h3: "text-2xl font-medium mb-3",
    h4: "text-xl font-medium mb-2",
    h5: "text-lg font-medium mb-1",
    h6: "text-base font-medium mb-1",
  };

  const combinedClassName = `${defaultClasses[as || "h1"]} ${className}`.trim();

  return React.createElement(
    Tag,
    { className: combinedClassName, ...(rest as Record<string, unknown>) },
    children
  );
};

export default Title;
