"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface ClientLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
}

const ClientLink: FC<ClientLinkProps> = ({ children, href, ...props }) => {
  const pathName = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const currentPath = pathName ?? "";
    setIsActive(currentPath === href || currentPath.startsWith(href));
  }, [mounted, pathName, href]);

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 rounded-md flex-1 h-full justify-center text-xs lg:text-base bg-secondary hover:bg-primary hover:text-primary-foreground",
        { "bg-primary text-primary-foreground": isActive }
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ClientLink;
