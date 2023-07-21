export const metadata = {
  title: "KTEL Application",
  description: "Created by Kostas Thomson",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>{children}</body>
    </html>
  );
}
