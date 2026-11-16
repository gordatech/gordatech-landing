'use client';

import { useState } from 'react';
import { CheckCircle, PaperPlaneRight, WhatsappLogo } from '@phosphor-icons/react/dist/ssr';
import { track, utm } from '@/lib/track';

type Field = 'company' | 'website_url' | 'service' | 'message';

/**
 * Form lead (kontak / audit). Kirim ke /api/lead (route Next.js) → diteruskan ke Laravel dengan API key di server.
 * Setelah berhasil: pesan sukses + tombol lanjut WhatsApp (opsional).
 */
export default function LeadForm({ type, fields, services = [], button, success, privacy, waNumber, messageLabel = 'Pesan', messagePlaceholder }: {
  type: 'contact' | 'audit' | 'consultation';
  fields: Field[];
  services?: { slug: string; title: string }[];
  button: string; success: string; privacy?: string; waNumber: string;
  messageLabel?: string; messagePlaceholder?: string;
}) {
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [summary, setSummary] = useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setState('sending');
    setErrors({});
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, type, source_url: location.href, utm: utm() }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrors(json.errors ?? { form: [json.message ?? 'Gagal mengirim. Coba lagi atau hubungi kami via WhatsApp.'] });
        setState('idle');
        return;
      }
      track(type === 'audit' ? 'audit_request' : 'generate_lead', { form_type: type, service: data.service || undefined });
      setSummary(`Halo GordaTech, saya ${data.name} baru mengirim ${type === 'audit' ? `permintaan audit untuk ${data.website_url || 'usaha saya'}` : 'pesan lewat form website'}.`);
      setState('done');
      form.reset();
    } catch {
      setErrors({ form: ['Koneksi terputus. Coba lagi atau hubungi kami via WhatsApp.'] });
      setState('idle');
    }
  }

  if (state === 'done') {
    return (
      <div role="status" className="rounded-xl border border-green-700/25 bg-white p-6 sm:p-8">
        <CheckCircle className="size-10 text-green-700" weight="bold" aria-hidden="true" />
        <p className="mt-4 font-display text-xl font-bold">Terkirim</p>
        <p className="mt-2 text-ink-soft">{success}</p>
        <a href={`https://wa.me/${waNumber}?text=${encodeURIComponent(summary)}`} target="_blank" rel="noopener" data-track-label={`Setelah form ${type}`} className="btn-wa mt-6">
          <WhatsappLogo className="size-5" weight="bold" aria-hidden="true" /> Percepat lewat WhatsApp
        </a>
      </div>
    );
  }

  const err = (k: string) => errors[k]?.[0];
  const input = (name: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, optional = false) => (
    <div>
      <label htmlFor={`f-${name}`} className="label">{label}{optional && <span className="font-normal text-ink-muted"> (opsional)</span>}</label>
      <input id={`f-${name}`} name={name} className="input" aria-invalid={!!err(name)} aria-describedby={err(name) ? `e-${name}` : undefined} {...props} />
      {err(name) && <p id={`e-${name}`} className="mt-1.5 text-sm text-red-700">{err(name)}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {input('name', 'Nama', { required: true, autoComplete: 'name', maxLength: 120, placeholder: 'Nama Anda' })}
        {input('phone', 'Nomor WhatsApp', { type: 'tel', inputMode: 'tel', autoComplete: 'tel', maxLength: 30, placeholder: '08xx xxxx xxxx' })}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {input('email', 'Email', { type: 'email', autoComplete: 'email', maxLength: 160, placeholder: 'nama@usaha.com' }, true)}
        {fields.includes('company') && input('company', 'Nama usaha', { autoComplete: 'organization', maxLength: 160 }, true)}
      </div>
      {fields.includes('website_url') && input('website_url', 'Alamat website', { inputMode: 'url', maxLength: 255, placeholder: 'usahaanda.com' }, true)}
      {fields.includes('service') && services.length > 0 && (
        <div>
          <label htmlFor="f-service" className="label">Layanan yang diminati <span className="font-normal text-ink-muted">(opsional)</span></label>
          <select id="f-service" name="service" className="input" defaultValue="">
            <option value="">Belum tahu, mohon dibantu</option>
            {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
          </select>
        </div>
      )}
      {fields.includes('message') && (
        <div>
          <label htmlFor="f-message" className="label">{messageLabel}{type !== 'contact' && <span className="font-normal text-ink-muted"> (opsional)</span>}</label>
          <textarea id="f-message" name="message" rows={4} maxLength={5000} className="input" placeholder={messagePlaceholder}
                    aria-invalid={!!err('message')} aria-describedby={err('message') ? 'e-message' : undefined} />
          {err('message') && <p id="e-message" className="mt-1.5 text-sm text-red-700">{err('message')}</p>}
        </div>
      )}
      {/* Honeypot: disembunyikan dari manusia */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-hp">Website</label><input id="f-hp" name="website_hp" tabIndex={-1} autoComplete="off" />
      </div>
      {err('form') && <p role="alert" className="rounded-md bg-red-700/5 px-4 py-3 text-sm text-red-700">{err('form')}</p>}
      <div className="flex flex-wrap items-center gap-4">
        <button className="btn-primary" disabled={state === 'sending'}>
          <PaperPlaneRight className="size-5" weight="bold" aria-hidden="true" /> {state === 'sending' ? 'Mengirim…' : button}
        </button>
        {privacy && <p className="text-sm text-ink-muted">{privacy}</p>}
      </div>
    </form>
  );
}
