const DsPage = () => {
  const data = [
    {
      name: "primary",
      label: "primary",
    },
    {
      name: "secondary",
      label: "secondary",
    },
    {
      name: "accent",
      label: "accent",
    },
    {
      name: "background",
      label: "background",
    },
    {
      name: "foreground",
      label: "foreground",
    },
    {
      name: "muted",
      label: "muted",
    },
    {
      name: "destructive",
      label: "destructive",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 p-4 w-full grid-rows-10">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col justify-center items-center text-center *:w-full"
          >
            <div className="capitalize font-bold">{item.label}</div>
            <div
              className="p-5 flex items-center justify-center"
              style={{ backgroundColor: `var(--${item.name})` }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DsPage;
