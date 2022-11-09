import { Author } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  author: Author;
};

export const AuthorCard = ({
  author: { avatar, firstName, lastName, bio },
}: Props) => {
  return (
    <div>
      <div className="bg-[#F0F0F0] p-6">
        <div className="flex gap-4 items-center">
          <Image
            width={200}
            height={200}
            src={avatar.url}
            className="h-12 w-12 inline-block rounded-full"
            alt={`${firstName}-${lastName}-avatar`}
          />
          <div>
            {firstName} {lastName}
          </div>
        </div>

        <p className="my-4">{bio}</p>
        <Link href="/">Check All</Link>
      </div>
    </div>
  );
};
