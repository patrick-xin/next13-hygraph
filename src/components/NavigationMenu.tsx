"use client";

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import cx from "clsx";
import Link from "next/link";
import { MainMenuControlLink } from "./MainMenuControlLink";

const links = [
  { href: "/", label: "home" },
  { href: "/", label: "home" },
  { href: "/", label: "home" },
  { href: "/", label: "home" },
  { href: "/", label: "home" },
  { href: "/", label: "home" },
  { href: "/", label: "home" },
];

type Props = {};

const NavigationMenu = (props: Props) => {
  return (
    <NavigationMenuPrimitive.Root className="relative">
      <NavigationMenuPrimitive.List className="flex flex-row rounded-lg dark:bg-gray-800 p-2 space-x-2">
        <NavigationMenuPrimitive.Item>
          <TriggerTitle title="Design" />

          <NavigationMenuPrimitive.Content
            className={cx(
              "absolute w-auto top-0 left-0 rounded-lg",
              "radix-motion-from-start:animate-enter-from-left",
              "radix-motion-from-end:animate-enter-from-right",
              "radix-motion-to-start:animate-exit-to-left",
              "radix-motion-to-end:animate-exit-to-right"
            )}
          >
            <div className="w-[21rem] lg:w-[30rem] p-3">
              <div className="text-lg my-2 text-center font-display italic">
                Find inspirations and ideas
              </div>
              <div className="grid grid-cols-3 gap-4 lg:p-6">
                {links.map((link, index) => (
                  /* @ts-expect-error */
                  // TODO Fix Next Link children Props
                  <MainMenuControlLink
                    key={index}
                    href={link.href}
                    className={cx(
                      "px-4 inline-block hover:text-[#ca9a9a] dark:hover:bg-gray-900 rounded-md",
                      "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                    )}
                  >
                    {link.label}
                  </MainMenuControlLink>
                ))}
              </div>
            </div>
          </NavigationMenuPrimitive.Content>
        </NavigationMenuPrimitive.Item>

        <NavigationMenuPrimitive.Item>
          <TriggerTitle title="Home Tours" />

          <NavigationMenuPrimitive.Content
            className={cx(
              "absolute w-auto top-0 left-0 rounded-lg bg-white",
              "radix-motion-from-start:animate-enter-from-left",
              "radix-motion-from-end:animate-enter-from-right",
              "radix-motion-to-start:animate-exit-to-left",
              "radix-motion-to-end:animate-exit-to-right"
            )}
          >
            <div className="w-[16rem] lg:w-[18rem] p-3">
              <div className="w-full flex flex-col space-y-2">
                {/* 
                // @ts-ignore */}
                <MainMenuControlLink
                  href={"/"}
                  className={cx(
                    "w-full px-4 inline-block py-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md",
                    "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  )}
                >
                  home
                </MainMenuControlLink>

                <NavigationMenuPrimitive.Link
                  className={cx(
                    "w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md",
                    "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  )}
                  href="https://www.radix-ui.com"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Radix UI
                  </span>

                  <div className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                    An open-source UI component library for building
                    high-quality, accessible design systems and web apps.
                  </div>
                </NavigationMenuPrimitive.Link>
              </div>
            </div>
          </NavigationMenuPrimitive.Content>
        </NavigationMenuPrimitive.Item>
        <NavigationMenuPrimitive.Item>
          <TriggerTitle title="Trends" />

          <NavigationMenuPrimitive.Content
            className={cx(
              "absolute w-auto top-0 left-0 rounded-lg bg-[#ca9a9a]",
              "radix-motion-from-start:animate-enter-from-left",
              "radix-motion-from-end:animate-enter-from-right",
              "radix-motion-to-start:animate-exit-to-left",
              "radix-motion-to-end:animate-exit-to-right"
            )}
          >
            <div className="w-[16rem] lg:w-[18rem] p-3">
              <div className="w-full flex flex-col space-y-2">
                {/* 
                // @ts-ignore */}

                <NavigationMenuPrimitive.Link
                  className={cx(
                    "w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md",
                    "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  )}
                  href="https://tailwindcss.com"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Tailwind CSS
                  </span>

                  <div className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                    A utility-first CSS framework for rapidly building custom
                    user interfaces.
                  </div>
                </NavigationMenuPrimitive.Link>
                <NavigationMenuPrimitive.Link
                  className={cx(
                    "w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md",
                    "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  )}
                  href="https://www.radix-ui.com"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Radix UI
                  </span>

                  <div className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                    An open-source UI component library for building
                    high-quality, accessible design systems and web apps.
                  </div>
                </NavigationMenuPrimitive.Link>
              </div>
            </div>
          </NavigationMenuPrimitive.Content>
        </NavigationMenuPrimitive.Item>
        <NavigationMenuPrimitive.Item asChild>
          <Link
            href="/about"
            className="px-3 py-2 rounded-md uppercase text-lg lg:text-xl font-display text-gray-700 dark:text-gray-100"
          >
            About
          </Link>
        </NavigationMenuPrimitive.Item>
        <NavigationMenuPrimitive.Indicator
          className={cx(
            "z-10",
            "top-[100%] flex items-end justify-center h-2 overflow-hidden",
            "radix-state-visible:animate-fade-in",
            "radix-state-hidden:animate-fade-out",
            "transition-[width_transform] duration-[250ms] ease-[ease]"
          )}
        >
          <div className="top-1 relative bg-white dark:bg-gray-800 w-2 h-2 rotate-45" />
        </NavigationMenuPrimitive.Indicator>
      </NavigationMenuPrimitive.List>

      <div
        className={cx(
          "absolute flex justify-center z-300",
          "w-[180%] left-[-40%] top-[100%]"
        )}
        style={{
          perspective: "2400px",
        }}
      >
        <NavigationMenuPrimitive.Viewport
          className={cx(
            "relative mt-2 shadow-lg rounded-md bg-white dark:bg-gray-800 overflow-hidden z-300",
            "w-radix-navigation-menu-viewport",
            "h-radix-navigation-menu-viewport",
            "radix-state-open:animate-scale-in-content",
            "radix-state-closed:animate-scale-out-content",
            "origin-[top_center] transition-[width_height] duration-300 ease-[ease]"
          )}
        />
      </div>
    </NavigationMenuPrimitive.Root>
  );
};

export default NavigationMenu;

const TriggerTitle = ({ title }: { title: string }) => {
  return (
    <NavigationMenuPrimitive.Trigger
      className={cx(
        "px-3 py-2 rounded-md uppercase",
        "text-lg lg:text-xl font-display",
        "text-gray-700 dark:text-gray-100",
        "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
      )}
    >
      {title}
    </NavigationMenuPrimitive.Trigger>
  );
};
