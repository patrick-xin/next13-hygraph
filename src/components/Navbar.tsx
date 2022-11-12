import { SearchBox } from "@/components/SearchBox";

import Link from "next/link";

import { MobileMenu } from "./MobileMenu";
import NavigationMenu from "./NavigationMenu";
import ThemeSwitcher from "./ThemeSwitch";

export const Navbar = () => {
  return (
    <div className="bg-[#F0F0F0] dark:bg-black">
      <Banner />
      <nav className="w-full h-16 flex items-center justify-between px-6 lg:h-32">
        <div>
          <Link href="/">logo</Link>
        </div>
        <MobileMenu />
        <ul className="gap-4 text-xl h-full items-center hidden lg:flex">
          <NavigationMenu />

          <ThemeSwitcher />
          {/* {categories.map((cat) => (
            <li key={cat.slug}>
              <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
            </li>
          ))} */}
          <div>
            <SearchBox />
          </div>
        </ul>
      </nav>
    </div>
  );
};

const Banner = () => {
  return (
    <div className="bg-[#ca9a9a] dark:bg-[#6E75A8] h-12 text-white flex items-center">
      <div className="text-sm max-w-3xl mx-auto">
        Magazine and newspaper with news arround the world
      </div>
    </div>
  );
};
