// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import Layout from '../components/Layout';
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Mini CRM',
  description: 'A simple CRM application',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className='bg-blue-50'>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
