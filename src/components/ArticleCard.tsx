import { Blog } from "@/lib/types";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import { AuthorAvatar } from "./AuthorAvatar";

type FeaturedArticleProps = Pick<
  Blog,
  "title" | "author" | "coverImage" | "excerpt" | "slug" | "createdAt"
>;

type Props = {
  hasAuthor?: boolean;
  hasDate?: boolean;
  imgSize?: "auto";
  dateFormat?: "normal" | "distance";
} & FeaturedArticleProps;

export const ArticleCard = ({
  title,
  coverImage,
  author,
  excerpt,
  slug,
  createdAt,
  hasAuthor = true,
  hasDate = false,
  dateFormat,
}: Props) => {
  return (
    <div className="flex flex-col md:gap-6 md:items-center">
      <div className="w-full relative h-[16rem] block">
        <Image src={coverImage.url} fill alt="img" className="object-cover" />
      </div>

      <div className="space-y-4 py-4">
        <div className="text-sm italic font-semibold">
          {format(parseISO(createdAt), "MMMM d yyyy")}
        </div>

        <h2 className="font-semibold text-2xl hover:text-amber-500">
          <Link href={`/article/${slug}`}>{title}</Link>
        </h2>
        {hasAuthor && (
          <AuthorAvatar
            author={author}
            publishedAt={createdAt}
            size="sm"
            dateFormat={dateFormat}
            hasDate={hasDate}
          />
        )}

        <p className="text-base lg:text-lg text-gray-700 my-2">
          {excerpt.slice(0, 100)}
        </p>

        <div>
          <Link href={`/article/${slug}`} className="hover:text-amber-500">
            Read More...
          </Link>
        </div>
      </div>
    </div>
  );
};
