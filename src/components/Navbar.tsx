import { SearchBox } from "@/components/SearchBox";
import { client } from "@/lib/client";
import { CATEGORY_QUERY } from "@/lib/query";
import { Category } from "@/lib/types";
import Link from "next/link";

import { use } from "react";
import { MenuHover } from "./MenuHover";
import { MenuPopover } from "./MenuPopover";
import { MobileMenu } from "./MobileMenu";
import NavigationMenu from "./NavigationMenu";
import ThemeSwitcher from "./ThemeSwitch";

async function getData() {
  const data: { categories: Category[] } = await client(CATEGORY_QUERY);

  return { categories: data.categories };
}
const getCategory = getData();

export const Navbar = () => {
  const { categories } = use(getCategory);
  return (
    <div className="bg-[#F0F0F0]">
      <Banner />
      <nav className="w-full h-16 flex items-center justify-between px-6">
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
    <div className="bg-[#ca9a9a] h-12 text-white flex items-center">
      <div className="text-sm max-w-3xl mx-auto">
        Magazine and newspaper with news arround the world
      </div>
    </div>
  );
};
