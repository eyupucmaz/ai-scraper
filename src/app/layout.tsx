import { Providers } from '@/app/providers';
import './globals.css';

export const metadata = {
  title: 'AI Scraper',
  description: 'AI-powered web scraping API for structured data extraction',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
