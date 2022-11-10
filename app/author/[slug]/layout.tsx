export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="p-4 lg:px-12 xl:px-20">{children}</section>;
}
