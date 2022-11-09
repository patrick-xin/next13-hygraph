import { Suspense } from "react";

import BlogNav from "./BlogNav";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
