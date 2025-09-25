import { rings } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import Image from "next/image";
import React, { FC } from "react";

interface AvatarProps {
  seed?: string;
  className?: string;
}

export const Avatar: FC<AvatarProps> = ({ seed, className }) => {
  const avatar = createAvatar(rings, { seed });

  const svg = avatar.toString();

  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString(
    "base64"
  )}`;

  return (
    <Image
      src={dataUrl}
      alt="avatar"
      width={100}
      height={100}
      className={className}
    />
  );
};
