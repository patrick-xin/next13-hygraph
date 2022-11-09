import React, { use } from "react";

import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";
import Image from "next/image";
import cn from "clsx";
import Link from "next/link";

import { Blog } from "@/lib/types";
import { client } from "@/lib/client";
import { HOME_PAGE_QUERY } from "@/lib/query";
import { Grid } from "@/components/Grid";
import { Column } from "@/components/Column";

async function getData() {
  const data: { blogs: Blog[] } = await client(HOME_PAGE_QUERY, { first: 4 });

  return { blogs: data.blogs };
}

export default function Home() {
  const { blogs } = use(getData());

  return (
    <div>
      <Hero />
      <div className="px-6 lg:px-10 xl:px-14">
        <Grid>
          <Column className="lg:p-0 lg:col-span-4">
            <ColTitle title="Fashion Category" />
            <div className="border-t border-black/20 py-6 space-y-6">
              {blogs.slice(1).map((post) => (
                <ArticleCard {...post} key={post.id} />
              ))}
            </div>
          </Column>

          <Column className="border-black/20 md:pl-4 md:pr-2 lg:px-8 md:border-l lg:border-r lg:col-span-5 lg:col-start-5">
            <ColTitle title="Modern post" />
            <p className="my-4">
              In this section you will find all the latest articles added by our
              blog specialists. We invite you to read.
            </p>
            <div className="py-6 space-y-6">
              {blogs.slice(1).map((post) => (
                <ArticleCard {...post} key={post.id} />
              ))}
            </div>
            <About className="hidden lg:block" />
          </Column>
          <Column className="lg:col-start-10 lg:p-0">
            <Employee />
          </Column>

          <About className="lg:hidden" />
        </Grid>
      </div>
    </div>
  );
}

const ColTitle = ({ title }: { title: string }) => {
  return <h3 className="text-xl font-bold mb-4 font-display">{title}</h3>;
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
