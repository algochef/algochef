'use client';
import React, { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [client] = useState(new QueryClient())
  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
};