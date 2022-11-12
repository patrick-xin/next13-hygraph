import Image from "next/image";

import { ArticleCard } from "@/components/ArticleCard";
import { FetchMore } from "@/components/FetchMore";

import { Author, BlogsConnection } from "@/lib/types";
import { client } from "@/lib/client";
import { BLOG_ON_AUTHOR_QUERY } from "@/lib/query";

async function getData(slug: string) {
  const data: {
    blogsConnection: BlogsConnection;
    author: Author;
  } = await client(BLOG_ON_AUTHOR_QUERY, {
    first: 5,
    slug,
  });
  const mostRecentArticles = data.blogsConnection.edges.slice(0, 3);
  const endCursor = data.blogsConnection.pageInfo.endCursor;
  const initialHasNextPage = data.blogsConnection.pageInfo.hasNextPage;
  return {
    mostRecentArticles,
    articles: data.blogsConnection.edges.slice(3),
    slug,
    endCursor,
    initialHasNextPage,
    author: data.author,
  };
}

const AuthorPage = async ({ params }: { params: { slug: string } }) => {
  const {
    articles,
    endCursor,
    slug,
    initialHasNextPage,
    author,
    mostRecentArticles,
  } = await getData(params.slug);
  return (
    <div>
      <section className="md:p-6">
        <div className="flex-col items-center gap-6 lg:gap-12">
          <div className="flex lg:justify-center my-4">
            <div className="relative">
              <Image
                src={author.avatar.url}
                width={200}
                height={200}
                className="rounded-full object-cover h-24 w-24"
                alt="author-avatar"
              />
            </div>
          </div>
          <div className="space-y-4 max-w-xl lg:mx-auto">
            <div className="lg:text-5xl text-4xl font-medium font-display lg:text-center">
              {author.firstName} {author.lastName}
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {author.bio}
            </p>
          </div>
        </div>
      </section>
      <hr className="w-full my-8 block bg-brand h-[3px]" />
      <section>
        <h3 className="font-semibold text-2xl lg:text-3xl my-6">
          Recent articles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 lg:grid-cols-3">
          {mostRecentArticles.map(({ node }) => (
            <ArticleCard {...node} key={node.id} hasAuthor={false} />
          ))}
          {articles.map(({ node }) => (
            <ArticleCard {...node} key={node.id} />
          ))}
          {initialHasNextPage && (
            <FetchMore
              endCursor={endCursor}
              path={`/api/author/${slug}`}
              slug={slug}
              type="author"
              initialHasNextPage={initialHasNextPage}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default AuthorPage;
