import { Blog } from "@/lib/types";
import { AuthorAvatar } from "./AuthorAvatar";
import { PublishDate } from "./PublishDate";

type Props = Pick<
  Blog,
  "title" | "author" | "coverImage" | "excerpt" | "slug" | "createdAt"
> & { hasAuthor?: boolean };

export const ListCard = ({
  title,
  coverImage,
  author,
  excerpt,
  slug,
  createdAt,
  hasAuthor,
}: Props) => {
  return (
    <div className="py-6 space-y-4">
      <h2 className="font-semibold text-2xl">
        <a href={`/article/${slug}`}>{title}</a>
      </h2>
      {hasAuthor && <AuthorAvatar author={author} size="sm" />}

      <p className="text-gray-700 text-sm md:text-base my-2">{excerpt}</p>
      <PublishDate publishedAt={createdAt} />
    </div>
  );
};
