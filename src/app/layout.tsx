import Menu from "@/components/Menu";
import "./globals.css";

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
      <head>
        <title>Dummy JSON Project</title>
      </head>
      <body>
      <Menu />
      <main>{children}</main>
      </body>
      </html>
  );
}
