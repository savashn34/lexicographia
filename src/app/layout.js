import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Lexicographia',
  description: 'Lexicograhia is an open source web application that allows lexicographers to create and publish their own dictionaries. It focused on to give all the tools that a lexicographer may need, while saving its simplicity and ease of use.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
