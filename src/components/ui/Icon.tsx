import {
  ArrowRight, ArrowUpRight, Briefcase, Browser, ChartLineUp, ChatsCircle, Check, CheckCircle, Clock, Code, Compass,
  DeviceMobile, EnvelopeSimple, FacebookLogo, Handshake, InstagramLogo, LinkedinLogo, List, MagnifyingGlass, MapPin, Megaphone,
  Package, Phone, Quotes, Robot, RocketLaunch, SealCheck, ShieldCheck, Storefront, Timer, TiktokLogo, TrendUp, UsersThree,
  WhatsappLogo, X, YoutubeLogo, CaretDown, ArrowLeft, Lightning, ListChecks, Target, FileText, CalendarBlank, Stack, Buildings, Key, Lifebuoy, Play, ArrowDownRight,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';

/** Satu set ikon (Phosphor Bold) — nama sama dengan admin & data layanan dari API. */
const MAP: Record<string, PhosphorIcon> = {
  'arrow-right': ArrowRight, 'arrow-up-right': ArrowUpRight, 'arrow-left': ArrowLeft, briefcase: Briefcase, browser: Browser,
  'chart-line-up': ChartLineUp, chats: ChatsCircle, check: Check, 'check-circle': CheckCircle, clock: Clock,
  code: Code, compass: Compass, 'device-mobile': DeviceMobile, email: EnvelopeSimple, facebook: FacebookLogo, handshake: Handshake,
  instagram: InstagramLogo, linkedin: LinkedinLogo, list: List, search: MagnifyingGlass, 'map-pin': MapPin, megaphone: Megaphone,
  package: Package, phone: Phone, quotes: Quotes, robot: Robot, rocket: RocketLaunch, seal: SealCheck, 'shield-check': ShieldCheck,
  storefront: Storefront, timer: Timer, tiktok: TiktokLogo, 'trend-up': TrendUp, 'users-three': UsersThree, whatsapp: WhatsappLogo,
  x: X, youtube: YoutubeLogo, 'caret-down': CaretDown, lightning: Lightning, 'list-checks': ListChecks, target: Target, file: FileText,
  calendar: CalendarBlank, stack: Stack, buildings: Buildings, key: Key, lifebuoy: Lifebuoy, play: Play, 'arrow-down-right': ArrowDownRight,
};

export default function Icon({ name, className = 'size-5', label, weight = 'bold' }: {
  name: string; className?: string; label?: string; weight?: 'bold' | 'regular' | 'fill' | 'duotone';
}) {
  const C = MAP[name] ?? Briefcase;
  return <C className={`shrink-0 ${className}`} weight={weight} aria-hidden={label ? undefined : true} aria-label={label} role={label ? 'img' : undefined} />;
}
