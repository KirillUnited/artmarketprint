import { B, BORDER, MUTED, Y } from '../mock/constants';
import { NAV } from '../mock/data';

export default function Header() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(250,250,250,.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div
        className="mx-auto max-w-screen-xl px-6"
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a
          href="#"
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: B,
            textDecoration: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          ArtMarket<span style={{ color: Y }}>Print</span>
        </a>
        <nav style={{ display: 'flex', gap: 28, fontSize: 14 }} className="hidden lg:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              style={{
                color: MUTED,
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color .15s',
              }}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="tel:+74951234567"
          style={{
            padding: '9px 18px',
            borderRadius: 12,
            background: B,
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'filter .15s',
          }}
        >
          Позвонить
        </a>
      </div>
    </header>
  );
}
