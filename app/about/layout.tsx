export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-4 lg:px-12">{children}</div>;
}
