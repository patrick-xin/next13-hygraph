import { client } from "@/lib/client";
import { BLOG_ON_AUTHOR_QUERY } from "@/lib/query";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cursor, slug } = req.body;

  const data = await client(BLOG_ON_AUTHOR_QUERY, {
    first: 3,
    after: cursor,
    slug,
  });

  res.status(200).json({ data });
}
