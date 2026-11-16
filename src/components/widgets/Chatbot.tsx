'use client';

import { useMemo, useRef, useState } from 'react';
import { ChatsCircle, PaperPlaneRight, WhatsappLogo, X } from '@phosphor-icons/react/dist/ssr';
import { track } from '@/lib/track';

type Msg = { from: 'bot' | 'me'; text: string; href?: string };
type Kb = {
  title: string; greeting: string; fallback: string; waHref: string;
  faqs: { question: string; answer: string }[];
  services: { title: string; excerpt: string; slug: string }[];
  contact: { address: string; phone: string; email: string; hours: string };
};

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s]/g, ' ');
const STOP = new Set(['apa', 'yang', 'dan', 'di', 'ke', 'untuk', 'saya', 'bisa', 'ada', 'berapa', 'gimana', 'bagaimana', 'apakah', 'dengan', 'itu', 'ini', 'kak', 'min', 'gordatech', 'mau', 'tanya']);
const words = (s: string) => norm(s).split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));

/** Asisten chat ringan: menjawab dari FAQ, layanan, dan kontak (semua dari admin). Tidak memanggil server. */
export default function Chatbot({ kb }: { kb: Kb }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', text: kb.greeting }]);
  const list = useRef<HTMLDivElement>(null);

  const index = useMemo(() => [
    ...kb.faqs.map((f) => ({ keys: words(f.question + ' ' + f.question + ' ' + f.answer.slice(0, 80)), text: f.answer, href: undefined as string | undefined })),
    ...kb.services.map((s) => ({ keys: words(s.title + ' ' + s.title + ' ' + s.excerpt), text: `${s.title}: ${s.excerpt}`, href: `/layanan/${s.slug}` })),
    { keys: words('alamat lokasi kantor dimana maps peta medan datang'), text: `Kantor kami: ${kb.contact.address}. Jam kerja ${kb.contact.hours}.`, href: '/kontak' },
    { keys: words('kontak nomor telepon whatsapp email hubungi admin'), text: `WhatsApp/telepon ${kb.contact.phone}, email ${kb.contact.email}.`, href: undefined },
    { keys: words('harga biaya tarif estimasi budget murah mahal paket penawaran'), text: 'Setiap kebutuhan bisnis berbeda, karena itu kami menyusun penawaran tertulis setelah sesi konsultasi tanpa biaya: ruang lingkup, linimasa, dan tahapan pembayaran jelas sejak awal. Ceritakan kebutuhan Anda melalui WhatsApp.', href: '/kontak' },
  ], [kb]);

  const answer = (q: string): Msg => {
    const qw = words(q);
    let best = { score: 0, text: '', href: undefined as string | undefined };
    for (const item of index) {
      const score = qw.reduce((n, w) => n + (item.keys.some((k) => k.startsWith(w) || w.startsWith(k)) ? 1 : 0), 0);
      if (score > best.score) best = { score, text: item.text, href: item.href };
    }
    return best.score > 0 ? { from: 'bot', text: best.text, href: best.href } : { from: 'bot', text: kb.fallback, href: kb.waHref };
  };

  const send = (q: string) => {
    if (!q.trim()) return;
    setMsgs((m) => [...m, { from: 'me', text: q }, answer(q)]);
    setInput('');
    track('chat_question', { question: q.slice(0, 100) });
    requestAnimationFrame(() => list.current?.scrollTo({ top: list.current.scrollHeight, behavior: 'smooth' }));
  };

  return (
    <div className="fixed bottom-20 right-4 z-30 lg:bottom-6 lg:right-6">
      {open && (
        <div role="dialog" aria-label={kb.title} className="mb-3 flex h-[min(32rem,calc(100dvh-9rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_12px_32px_-12px_rgb(22_28_58/0.35)]">
          <div className="flex items-center justify-between bg-night px-4 py-3 text-white">
            <p className="font-display font-bold">{kb.title}</p>
            <button type="button" onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-md hover:bg-white/10">
              <X className="size-5" weight="bold" aria-label="Tutup chat" />
            </button>
          </div>
          <div ref={list} className="flex-1 space-y-3 overflow-y-auto p-4 text-[0.95rem]" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === 'me' ? 'ml-8 rounded-lg bg-navy-500 px-3.5 py-2.5 text-white' : 'mr-6 rounded-lg bg-paper px-3.5 py-2.5'}>
                <p className="whitespace-pre-line">{m.text}</p>
                {m.href && (
                  <a href={m.href} {...(m.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
                     className="mt-1.5 inline-block text-sm font-semibold text-brand-600 underline underline-offset-4">
                    {m.href.includes('wa.me') ? 'Lanjut di WhatsApp' : 'Lihat detail'}
                  </a>
                )}
              </div>
            ))}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2">
                {['Berapa biaya website?', 'Berapa lama pengerjaan?', 'Alamat kantor?', 'Layanan iklan digital'].map((q) => (
                  <button key={q} type="button" onClick={() => send(q)} className="rounded-full border border-line px-3 py-1.5 text-sm hover:border-ink">{q}</button>
                ))}
              </div>
            )}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-line p-3">
            <label htmlFor="chat-q" className="sr-only">Tulis pertanyaan</label>
            <input id="chat-q" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tulis pertanyaan…" className="input min-h-11 flex-1 py-2" maxLength={200} />
            <button className="grid size-11 place-items-center rounded-md bg-navy-500 text-white hover:bg-navy-700"><PaperPlaneRight className="size-5" weight="bold" aria-label="Kirim" /></button>
          </form>
          <a href={kb.waHref} target="_blank" rel="noopener" data-track-label="Chatbot" className="flex items-center justify-center gap-2 border-t border-line py-2.5 text-sm font-semibold text-brand-600 hover:bg-paper">
            <WhatsappLogo className="size-5" weight="bold" aria-hidden="true" /> Bicara dengan tim di WhatsApp
          </a>
        </div>
      )}
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}
              className="ml-auto grid size-14 place-items-center rounded-full bg-navy-500 text-white shadow-[0_8px_20px_-8px_rgb(22_28_58/0.6)] hover:bg-navy-700">
        {open ? <X className="size-6" weight="bold" aria-label="Tutup asisten" /> : <ChatsCircle className="size-7" weight="bold" aria-label="Buka asisten chat" />}
      </button>
    </div>
  );
}
