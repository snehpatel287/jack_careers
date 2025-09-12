import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Header } from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jack Careers - Find Your Dream Developer Job',
  description: 'Discover thousands of developer jobs from top companies. Filter by remote work, tech stack, and experience level.',
  icons: {
    icon: "/jack_career.png", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-4">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}