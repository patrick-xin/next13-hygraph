import { use } from "react";
import Image from "next/image";
import { Author, BlogsConnection } from "@/lib/types";
import { client } from "@/lib/client";
import { BLOG_ON_AUTHOR_QUERY } from "@/lib/query";
import { ArticleCard } from "@/components/ArticleCard";
import { ListCard } from "@/components/ListCard";
import FetchMore from "@/components/FetchMore";

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

const AuthorPage = ({ params }: { params: { slug: string } }) => {
  const {
    articles,
    endCursor,
    slug,
    initialHasNextPage,
    author,
    mostRecentArticles,
  } = use(getData(params.slug));
  return (
    <div>
      <section className="md:p-6">
        <div className="flex-col items-center gap-6 lg:gap-12">
          <div className="flex justify-center my-4">
            <div className="relative h-40 w-40">
              <Image
                src={author.avatar.url}
                fill
                className="rounded-full object-cover"
                alt="author-avatar"
              />
            </div>
          </div>
          <div className="space-y-4 max-w-lg mx-auto">
            <div className="lg:text-5xl text-3xl font-semibold text-center">
              {author.firstName} {author.lastName}
            </div>
            <p className="text-lg">{author.bio}</p>
          </div>
        </div>
      </section>
      <hr className="w-full my-8 block bg-black h-[3px]" />
      <section>
        <h3 className="font-semibold text-2xl lg:text-3xl my-6">
          Recent articles
        </h3>
        <div className="space-y-6">
          {mostRecentArticles.map(({ node }) => (
            <ArticleCard {...node} key={node.id} hasAuthor={false} />
          ))}
        </div>
      </section>

      <section className="divide-y divide-gray-200">
        {articles.map(({ node }) => (
          <ListCard {...node} key={node.id} />
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
      </section>
    </div>
  );
};

export default AuthorPage;
