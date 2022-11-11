import Image from "next/image";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

import { AuthorCard } from "@/components/AuthorCard";
import { Blog } from "@/lib/types";
import { client } from "@/lib/client";
import { ARTICLE_QUERY } from "@/lib/query";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { ReadMore } from "@/components/ReadMore";

async function getData(slug: string) {
  const article: { blog: Blog } = await client(ARTICLE_QUERY, {
    slug,
  });
  const { base64 } = await getPlaiceholder(article.blog.coverImage.url);
  article.blog.coverImage.blurDataUrl = base64;

  const images = article.blog.content.references.filter((asset) =>
    asset.mimeType.includes("image")
  );
  await Promise.all(
    images.map(async (image) => {
      const { base64 } = await getPlaiceholder(image.url);
      image.blurDataUrl = base64;
    })
  );

  return { post: article };
}

const BlogDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { post } = await getData(params.slug);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="md:grid md:grid-cols-6 gap-8 lg:gap-16">
        <MainColumn post={post.blog} />
        <RecentColumn post={post.blog} />
      </div>
    </div>
  );
};

export default BlogDetailPage;

const MainColumn = ({ post }: { post: Blog }) => {
  return (
    <div className="col-span-4">
      <div className="max-w-3xl lg:mx-8 xl:mx-12 mt-8">
        <h1 className="text-4xl font-bold lg:text-5xl my-6 lg:leading-snug lg:tracking-wide whitespace-normal capitalize">
          {post.title}
        </h1>
        <p className="text-gray-700 my-6 text-lg">{post.excerpt}</p>
        <AuthorAvatar
          author={post.author}
          hasDate
          publishedAt={post.createdAt}
        />
      </div>

      <div className="my-6 relative min-h-[50vh] lg:my-10">
        <Image
          src={post.coverImage.url}
          fill
          alt="image-cover"
          className="object-cover rounded"
          blurDataURL={post.coverImage.blurDataUrl}
          placeholder="blur"
        />
      </div>
      <div className="lg:mx-8 xl:m-12">
        <RichText
          content={post.content.json}
          references={post.content.references}
          renderers={{
            Asset: {
              image: ({ url, width, height, blurDataUrl }) => {
                return (
                  <Image
                    src={url}
                    alt="image"
                    width={width}
                    height={height}
                    placeholder={blurDataUrl ? "blur" : "empty"}
                    blurDataURL={blurDataUrl}
                  />
                );
              },
            },
            h1: ({ children }) => (
              <h1 className="text-4xl font-black my-8">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-3xl font-bold my-6 capitalize">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-2xl font-semibold my-4">{children}</h3>
            ),
            p: ({ children }) => <p className="text-lg my-6">{children}</p>,
            ul: ({ children }) => (
              <ul className="text-lg my-6 list-disc space-y-4">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="text-lg my-6 list-decimal space-y-4">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="">{children}</li>,
            a: ({ children, openInNewTab, href, ...rest }) => {
              if (href!.match(/^https?:\/\/|^\/\//i)) {
                return (
                  <a
                    className="text-brand underline underline-offset-1 decoration-brand font-semibold"
                    href={href}
                    target={openInNewTab ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    {...rest}
                  >
                    {children}
                  </a>
                );
              }

              return <Link href={href!}>{children}</Link>;
            },

            img: ({ src, altText, height, width }) => {
              return (
                <Image src={src!} alt="image" height={height} width={width} />
              );
            },
          }}
        />
      </div>

      <AuthorCard author={post.author} />
    </div>
  );
};

const RecentColumn = ({ post }: { post: Blog }) => {
  return (
    <div className="my-8 col-start-5 col-span-full md:px-8 md:border-l md:border-black/20 lg:px-12">
      <h3 className="text-xl font-bold pb-4 border-b border-black/20">
        Recent post from {post.author.firstName} {post.author.lastName}
      </h3>
      <div className="divide-y space-y-6">
        {post.author.recentPosts.map((post) => (
          <div className="py-4" key={post.id}>
            <Link href={`/article/${post.slug}`}>
              <h2 className="font-bold text-2xl my-3 underline capitalize">
                {post.title}
              </h2>
            </Link>
            <p className="line-clamp-2">{post.excerpt}</p>
            <ReadMore href={`/article/${post.slug}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
