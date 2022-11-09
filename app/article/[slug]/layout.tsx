export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="px-4">{children}</section>;
}
