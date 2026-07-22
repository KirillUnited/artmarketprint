'use client';
import { motion, AnimatePresence } from 'motion/react';
import { MUTED, Y, B, BORDER, CARD } from '../../mock/constants';
import { cn } from '@/lib/utils';
function Fade({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.42, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

function SectionEyebrow({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span
        style={{
          color: MUTED,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        {n}
      </span>
      <span style={{ height: 1, width: 24, background: BORDER, flexShrink: 0 }} />
      <span
        style={{
          color: MUTED,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function YellowTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: Y,
        color: B,
        borderRadius: 999,
        padding: '6px 14px',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.04em',
      }}
    >
      {children}
    </span>
  );
}

function BtnPrimary({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: Y,
        color: B,
        fontWeight: 700,
        fontSize: 15,
        borderRadius: 14,
        padding: '13px 24px',
        textDecoration: 'none',
        transition: 'filter .15s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(.92)')}
      onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
    >
      {children}
    </a>
  );
}

function BtnDark({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: B,
        color: '#fff',
        fontWeight: 700,
        fontSize: 15,
        borderRadius: 14,
        padding: '13px 24px',
        textDecoration: 'none',
        transition: 'filter .15s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.4)')}
      onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
    >
      {children}
    </a>
  );
}

function Card({
  children,
  style = {},
  className = '',
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, ...style }}
    >
      {children}
    </div>
  );
}

export { Card, BtnPrimary, BtnDark, SectionEyebrow, YellowTag, Fade };
