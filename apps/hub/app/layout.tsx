import type { Metadata } from 'next';
import { Pixelify_Sans } from 'next/font/google';
import './globals.css';

const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pixelify-sans',
});

export const metadata: Metadata = {
  title: 'Thommy Xay',
  description: 'Personal hub — portfolio, gallery, links',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${pixelifySans.variable} font-pixel`}>
        {children}
      </body>
    </html>
  );
}
