import Image from "next/image";
import { Blog } from "@/lib/types";
import { parseISO, format } from "date-fns";
import Link from "next/link";

export const Card = ({ post }: { post: Blog }) => {
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
    <Link href={`/blog/${slug}`} className="inline-block">
      <div className="border p-3 border-gray-400 transition-all ease-linear flex gap-3 justify-between">
        <div>
          <h1 className="font-bold text-lg my-3">{title}</h1>
          <div>
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

        <div className="relative w-3/4 h-36 md:hidden">
          <Image src={url} alt={`${title}-cover-image`} fill />
        </div>
      </div>
    </Link>
  );
};
