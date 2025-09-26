import ColorItem from "@/components/ds/ColorItem";
import Headline from "@/components/Headline";
import { Card, CardContent } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";

const DsPage = () => {
  const mainColors = [
    {
      id: uuidv4(),
      name: "primary",
      label: "primary",
    },
    {
      id: uuidv4(),
      name: "primary-foreground",
      label: "primary-foreground",
    },
    {
      id: uuidv4(),
      name: "secondary",
      label: "secondary",
    },
    {
      id: uuidv4(),
      name: "secondary-foreground",
      label: "secondary-foreground",
    },
    {
      id: uuidv4(),
      name: "accent",
      label: "accent",
    },
    {
      id: uuidv4(),
      name: "accent-foreground",
      label: "accent-foreground",
    },
    {
      id: uuidv4(),
      name: "muted",
      label: "muted",
    },
    {
      id: uuidv4(),
      name: "muted-foreground",
      label: "muted-foreground",
    },
    {
      id: uuidv4(),
      name: "destructive",
      label: "destructive",
    },
    {
      id: uuidv4(),
      name: "destructive-foreground",
      label: "destructive-foreground",
    },
  ];

  const baseColors = [
    {
      id: uuidv4(),
      name: "background",
      label: "background",
    },
    {
      id: uuidv4(),
      name: "foreground",
      label: "foreground",
    },
    {
      id: uuidv4(),
      name: "border",
      label: "border",
    },
    {
      id: uuidv4(),
      name: "ring",
      label: "ring",
    },
  ];

  const sidebarColor = [
    {
      id: uuidv4(),
      name: "sidebar",
      label: "sidebar",
    },
    {
      id: uuidv4(),
      name: "sidebar-foreground",
      label: "sidebar-foreground",
    },
    {
      id: uuidv4(),
      name: "sidebar-primary",
      label: "sidebar-primary",
    },
    {
      id: uuidv4(),
      name: "sidebar-primary-foreground",
      label: "sidebar-primary-foreground",
    },
    {
      id: uuidv4(),
      name: "sidebar-accent",
      label: "sidebar-accent",
    },
    {
      id: uuidv4(),
      name: "sidebar-accent-foreground",
      label: "sidebar-accent-foreground",
    },
    {
      id: uuidv4(),
      name: "sidebar-border",
      label: "sidebar-border",
    },
    {
      id: uuidv4(),
      name: "sidebar-ring",
      label: "sidebar-ring",
    },
  ];

  const chartColor = [
    {
      id: uuidv4(),
      name: "chart-1",
      label: "chart-1",
    },
    {
      id: uuidv4(),
      name: "chart-2",
      label: "chart-2",
    },
    {
      id: uuidv4(),
      name: "chart-3",
      label: "chart-3",
    },
    {
      id: uuidv4(),
      name: "chart-4",
      label: "chart-4",
    },
    {
      id: uuidv4(),
      name: "chart-5",
      label: "chart-5",
    },
  ];

  const componentsColor = [
    {
      id: uuidv4(),
      name: "card",
      label: "card",
    },
    {
      id: uuidv4(),
      name: "card-foreground",
      label: "card-foreground",
    },
    {
      id: uuidv4(),
      name: "popover",
      label: "popover",
    },
    {
      id: uuidv4(),
      name: "popover-foreground",
      label: "popover-foreground",
    },
    {
      id: uuidv4(),
      name: "input",
      label: "input",
    },
  ];

  return (
    <section className="flex flex-col gap-12 w-full">
      <Card>
        <CardContent>
          <Headline level={2} className="mb-2">
            Light theme
          </Headline>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
            <div className="flex flex-col">
              <Headline level={4} className="mb-2">
                Main
              </Headline>

              <div className="flex flex-col gap-5">
                {mainColors.map((item) => {
                  return <ColorItem item={item} key={item.id} />;
                })}
              </div>
            </div>

            <div className="flex flex-col">
              <Headline level={4} className="mb-2">
                Base
              </Headline>

              <div className="flex flex-col gap-5">
                {baseColors.map((item) => {
                  return <ColorItem item={item} key={item.id} />;
                })}
              </div>
            </div>

            <div className="flex flex-col">
              <Headline level={4} className="mb-2">
                Chart
              </Headline>

              <div className="flex flex-col gap-5">
                {chartColor.map((item) => {
                  return <ColorItem item={item} key={item.id} />;
                })}
              </div>
            </div>

            <div className="flex flex-col">
              <Headline level={4} className="mb-2">
                Components
              </Headline>

              <div className="flex flex-col gap-5">
                {componentsColor.map((item) => {
                  return <ColorItem item={item} key={item.id} />;
                })}
              </div>
            </div>

            <div className="flex flex-col">
              <Headline level={4} className="mb-2">
                Sidebar
              </Headline>

              <div className="flex flex-col gap-5">
                {sidebarColor.map((item) => {
                  return <ColorItem item={item} key={item.id} />;
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Headline level={2} className="mb-2">
            Dark theme
          </Headline>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full text-foreground">
            <div className="flex flex-col">
              <Headline level={4} className="mb-2">
                Main
              </Headline>

              <div className="flex flex-col gap-5">
                {mainColors.map((item) => {
                  return <ColorItem item={item} key={item.id} />;
                })}
              </div>
            </div>

            <div className="flex flex-col">
              <Headline level={4} className="mb-2">
                Base
              </Headline>

              <div className="flex flex-col gap-5">
                {baseColors.map((item) => {
                  return <ColorItem item={item} key={item.id} />;
                })}
              </div>
            </div>

            <div className="flex flex-col">
              <Headline level={4} className="mb-2">
                Chart
              </Headline>

              <div className="flex flex-col gap-5">
                {chartColor.map((item) => {
                  return <ColorItem item={item} key={item.id} />;
                })}
              </div>
            </div>

            <div className="flex flex-col">
              <Headline level={4} className="mb-2">
                Components
              </Headline>

              <div className="flex flex-col gap-5">
                {componentsColor.map((item) => {
                  return <ColorItem item={item} key={item.id} />;
                })}
              </div>
            </div>

            <div className="flex flex-col">
              <Headline level={4} className="mb-2">
                Sidebar
              </Headline>

              <div className="flex flex-col gap-5">
                {sidebarColor.map((item) => {
                  return <ColorItem item={item} key={item.id} />;
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default DsPage;
