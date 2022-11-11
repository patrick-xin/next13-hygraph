import Link from "next/link";

import { Grid } from "@/components/Grid";
import { Column } from "@/components/Column";
import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";

import { Blog, Category } from "@/lib/types";
import { client } from "@/lib/client";
import { HOME_PAGE_QUERY } from "@/lib/query";

async function getData() {
  const data: { categories: Category[] } = await client(HOME_PAGE_QUERY, {
    first: 6,
  });
  const design_ideas_category = data.categories.filter(
    (c) => c.slug === "design-ideas"
  )[0];
  const shopping_category = data.categories.filter(
    (c) => c.slug === "shopping"
  )[0];
  return { design_ideas_category, shopping_category };
}

export default async function Home() {
  const { design_ideas_category, shopping_category } = await getData();

  return (
    <div>
      <Hero />

      <div className="px-6 lg:px-10 xl:px-14">
        <Grid>
          <Column className="lg:p-0 lg:col-span-4">
            <ColTitle title={design_ideas_category.name} />
            <div className="border-t border-black/20 space-y-4">
              {design_ideas_category.blogs.map((blog) => (
                <ArticleCard key={blog.id} {...blog} imgSize="vertical" />
              ))}
            </div>
            <Link
              className="text-xl text-brand underline underline-offset-2 decoration-brand"
              href={`/category/${design_ideas_category.slug}`}
            >
              View more design ideas
            </Link>
          </Column>

          <Column className="border-black/20 md:pl-4 md:pr-2 lg:px-8 md:border-l lg:border-r lg:col-span-5 lg:col-start-5">
            <ColTitle title={shopping_category.name} />
            <div className="py-6 space-y-4">
              {shopping_category.blogs.map((post) => (
                <ArticleCard {...post} key={post.id} />
              ))}
            </div>
            <Link
              className="text-xl text-brand underline underline-offset-2 decoration-brand"
              href={`/category/${design_ideas_category.slug}`}
            >
              View more shoppings
            </Link>
            <About className="hidden lg:block mt-12" />
          </Column>
          <Column className="lg:col-start-10 lg:p-0">
            <Employee />
          </Column>

          <About className="lg:hidden mb-8" />
        </Grid>
      </div>
    </div>
  );
}

const ColTitle = ({ title }: { title: string }) => {
  return <h3 className="text-xl font-bold">{title}</h3>;
};

const Employee = () => {
  return (
    <div>
      <div className="my-6 lg:mb-16">
        <h5>Newspaper from scratch</h5>
        <h3 className="text-3xl font-bold my-4">
          Our company creates with a hobby
        </h3>
        <div className="my-3">Employed people</div>
        <p>
          We focus on and take care of the development of our articles, taking
          care of the highest level. Meet our creators and their biographies.
        </p>
      </div>
      <div className="space-y-6 lg:space-y-20 lg:mb-16">
        {/* <EmployeeCard />
        <EmployeeCard /> */}
      </div>
      <div className="my-6 space-y-4">
        {/* <Image src={bgImage} className="" /> */}
        <h3 className="text-3xl">About us</h3>
        <p>
          Get to know our office and where to visit us. This is just an example
          of information about our activities.
        </p>
        <p>
          We are a company that has been operating on the market for over 20
          years. We have created many startup projects during this time. Our
          office is a process that we create all the time.
        </p>
        <Link href={"/"}>Read More</Link>
      </div>
    </div>
  );
};

const About = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <div className="bg-[#EEEEEE] p-6">
        <div className="text-lg font-bold mb-4">About NewsPaper</div>
        <p>
          Visit our website every day and it will certainly be a useful and
          pleasant time for you. Use the navigation to find the articles.
        </p>
      </div>
    </div>
  );
};
