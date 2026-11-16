import { postLead } from '@/lib/api';

/** Form browser → server Next.js → Laravel POST /leads (API key tetap rahasia di server). */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ message: 'Data tidak valid.' }, { status: 400 });
  }
  const allowed = ['type', 'name', 'phone', 'email', 'company', 'service', 'service_interest', 'website_url', 'message', 'payload', 'source_url', 'utm', 'website_hp'];
  const clean = Object.fromEntries(Object.entries(body).filter(([k, v]) => allowed.includes(k) && v !== '' && v != null));
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip');
  try {
    const { status, json } = await postLead(clean, { ip, agent: req.headers.get('user-agent') });
    return Response.json(json, { status });
  } catch {
    return Response.json({ message: 'Server sedang sibuk. Silakan hubungi kami via WhatsApp.' }, { status: 502 });
  }
}
