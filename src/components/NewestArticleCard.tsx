import Image from "next/image";

import { parseISO, format } from "date-fns";
import Link from "next/link";
import { Blog } from "@/lib/types";

export const NewestArticleCard = ({ post }: { post: Blog }) => {
  const {
    coverImage: { url },
    title,
    excerpt,
    author: { avatar, firstName, lastName },
    categories,
    createdAt,
    slug,
  } = post;
  return (
    <Link href={`/blog/${slug}`} className="inline-block h-full">
      <div className="border border-gray-400 ">
        <div className="relative w-full h-64">
          <Image src={url} fill alt={`${title}-cover-image`} />
        </div>
        <div className="p-4">
          <h1 className="font-bold text-2xl my-3">{title}</h1>
          <p>{excerpt}</p>
          <div className="flex gap-4 items-center my-2 text-gray-500">
            <Image
              src={avatar.url}
              alt="avatar"
              width={100}
              height={100}
              className="w-12 h-12 rounded-full"
            />
            <div>
              {firstName} {lastName}
            </div>
          </div>
          <div className="flex gap-2 items-center text-gray-500">
            <div>
              {categories.map((c) => (
                <div key={c.name}>{c.name}</div>
              ))}
            </div>
            <div>|</div>
            <div>{format(parseISO(createdAt), "MMMM d")}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
