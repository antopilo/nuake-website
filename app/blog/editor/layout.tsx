"use client"

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { SessionProvider } from 'next-auth/react';

export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <SessionProvider>
        <main>{children}</main>
      </SessionProvider>
    );
  }