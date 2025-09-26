import React from "react";

interface ColorItemProps {
  item: {
    id: string;
    name: string;
    label: string;
  };
}

const ColorItem: React.FC<ColorItemProps> = ({ item }) => {
  return (
    <div
      key={item.id}
      className="flex flex-col justify-center items-center text-center *:w-full"
    >
      <div className="capitalize font-bold">{item.label}</div>
      <div
        className="p-5 flex items-center justify-center"
        style={{ backgroundColor: `var(--${item.name})` }}
      />
    </div>
  );
};

export default ColorItem;
