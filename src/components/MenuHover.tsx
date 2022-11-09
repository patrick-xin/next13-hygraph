import * as HoverCard from "@radix-ui/react-hover-card";
import Link from "next/link";
import { useState } from "react";

type Props = {
  name: string;
  description?: string;
  slug: string;
  icon?: JSX.Element;
}[];

export const MenuHover = ({ data }: { data: Props }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <HoverCard.Root
      openDelay={0}
      open={isOpen}
      onOpenChange={setOpen}
      // defaultOpen={true}
    >
      <HoverCard.Trigger asChild>
        <div className="text-base w-full">Browser Category</div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className="animate-fade-in" sideOffset={10}>
          <div className="w-64 p-6 rounded-lg shadow-lg bg-white">
            {data.map((item) => (
              <Link
                onClick={() => setOpen(!isOpen)}
                key={item.name}
                href={`/category/${item.slug}`}
                className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
              >
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {item.name}
                  </p>

                  {item.description ? (
                    <p className="text-sm text-gray-500">{item.description}</p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
          <HoverCard.Arrow className="text-white shadow-lg fill-current" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};
