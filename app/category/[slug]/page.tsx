import Image from "next/image";
import { BlogsConnection, Category } from "@/lib/types";
import { BLOG_ON_CATEGORY_QUERY } from "@/lib/query";
import { client } from "@/lib/client";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { ArticleCard } from "@/components/ArticleCard";
import { FetchMore } from "@/components/FetchMore";
import Link from "next/link";

async function getData(slug: string) {
  const data: { categories: Category[]; blogsConnection: BlogsConnection } =
    await client(BLOG_ON_CATEGORY_QUERY, {
      first: 4,
      slug,
    });

  const newest = data.blogsConnection.edges[0];
  const endCursor = data.blogsConnection.pageInfo.endCursor;
  const initialHasNextPage = data.blogsConnection.pageInfo.hasNextPage;
  return {
    categories: data.categories,
    newest,
    articles: data.blogsConnection.edges.slice(1),
    slug,
    endCursor,
    initialHasNextPage,
  };
}

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const { articles, categories, endCursor, slug, initialHasNextPage, newest } =
    await getData(params.slug);
  return (
    <div>
      <h1 className="text-6xl font-bold text-center my-12 uppercase">{slug}</h1>
      <section className="max-w-6xl mx-auto relative mb-40">
        <div className="h-[50vh] z-10">
          <Image
            src={newest.node.coverImage.url}
            alt="img"
            fill
            className="rounded object-cover"
          />
        </div>
        <div className="absolute -bottom-16 p-8 z-20 right-0 left-0 mx-auto bg-white bg-opacity-90 shadow w-5/6 flex justify-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">
              <Link
                className="hover:underline"
                href={`/article/${newest.node.slug}`}
              >
                {newest.node.title}
              </Link>
            </h2>
            <p>{newest.node.excerpt}</p>
            <AuthorAvatar
              author={newest.node.author}
              publishedAt={newest.node.createdAt}
            />
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {articles.map(({ node }) => (
          <ArticleCard {...node} key={node.id} />
        ))}
      </div>
      <FetchMore
        endCursor={endCursor}
        path={`/api/category/${slug}`}
        slug={slug}
        type="category"
        initialHasNextPage={initialHasNextPage}
      />
    </div>
  );
};

export default CategoryPage;
