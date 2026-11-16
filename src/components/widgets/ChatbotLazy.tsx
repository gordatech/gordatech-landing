'use client';

import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import type ChatbotType from './Chatbot';

/** Asisten chat dimuat setelah halaman siap (tidak ikut bundel awal). */
const Chatbot = dynamic(() => import('./Chatbot'), { ssr: false });

export default function ChatbotLazy(props: ComponentProps<typeof ChatbotType>) {
  return <Chatbot {...props} />;
}
