import { Search, Menu, Phone } from 'lucide-react';

import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries/site.query';
import { sanityFetch } from '@/sanity/lib/sanityFetch';

import { B, BORDER, MUTED, Y } from '../mock/constants';
import { NAV } from '../mock/data';

type SitePhone = {
  _key?: string;
  link: string;
  number: string;
};

const fallbackPhones: SitePhone[] = [
  {
    _key: 'fallback-phone',
    link: '+74951234567',
    number: '+7 (495) 123-45-67',
  },
];

const SearchForm = ({ compact = false }: { compact?: boolean }) => (
  <form
    action="/search"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      width: compact ? '100%' : 320,
      maxWidth: '100%',
    }}
  >
    <label className="sr-only" htmlFor={compact ? 'service-mobile-search' : 'service-search'}>
      Поиск по сайту
    </label>
    <div
      style={{
        position: 'relative',
        flex: 1,
      }}
    >
      <Search
        aria-hidden="true"
        size={16}
        style={{
          color: MUTED,
          left: 12,
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />
      <input
        id={compact ? 'service-mobile-search' : 'service-search'}
        name="query"
        placeholder="Поиск по сайту"
        type="search"
        style={{
          background: '#fff',
          border: `1px solid ${BORDER}`,
          borderRadius: 12,
          color: B,
          fontSize: 14,
          height: 40,
          outline: 'none',
          padding: '0 12px 0 38px',
          width: '100%',
        }}
      />
    </div>
    <button
      aria-label="Найти"
      type="submit"
      style={{
        alignItems: 'center',
        background: B,
        border: 0,
        borderRadius: 12,
        color: '#fff',
        cursor: 'pointer',
        display: 'inline-flex',
        height: 40,
        justifyContent: 'center',
        minWidth: 40,
      }}
    >
      <Search aria-hidden="true" size={16} />
    </button>
  </form>
);

const PhoneLinks = ({ phones, compact = false }: { phones: SitePhone[]; compact?: boolean }) => (
  <div
    style={{
      alignItems: compact ? 'stretch' : 'flex-end',
      display: 'flex',
      flexDirection: 'column',
      gap: compact ? 10 : 2,
    }}
  >
    {phones.map((phone) => (
      <a
        key={phone._key ?? phone.link}
        href={`tel:${phone.link}`}
        style={{
          alignItems: 'center',
          color: B,
          display: 'inline-flex',
          fontSize: compact ? 16 : 14,
          fontWeight: 800,
          gap: 8,
          justifyContent: compact ? 'flex-start' : 'flex-end',
          textDecoration: 'none',
        }}
      >
        <Phone aria-hidden="true" size={compact ? 18 : 15} />
        {phone.number}
      </a>
    ))}
  </div>
);

async function getPhones(): Promise<SitePhone[]> {
  try {
    const siteSettings = await sanityFetch({
      query: SITE_SETTINGS_QUERY,
      revalidate: 60,
    });
    const phones = siteSettings?.siteContactInfo?.phones;

    return Array.isArray(phones) && phones.length > 0 ? phones : fallbackPhones;
  } catch (error) {
    console.error('[services/Header] Failed to fetch site phones', error);

    return fallbackPhones;
  }
}

export default async function Header() {
  const phones = await getPhones();
  const primaryPhone = phones[0];

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <a
            href="#"
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: B,
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            ArtMarket<span style={{ color: Y }}>Print</span>
          </a>
          <nav style={{ gap: 28, fontSize: 14 }} className="hidden lg:flex">
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
        </div>
        <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 18 }}>
          <SearchForm />
          <PhoneLinks phones={phones} />
          {primaryPhone ? (
            <a
              href={`tel:${primaryPhone.link}`}
              style={{
                padding: '9px 18px',
                borderRadius: 12,
                background: B,
                color: '#fff',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'filter .15s',
                whiteSpace: 'nowrap',
              }}
            >
              Позвонить
            </a>
          ) : null}
        </div>
        <details className="lg:hidden" style={{ position: 'relative' }}>
          <summary
            aria-label="Открыть меню"
            style={{
              alignItems: 'center',
              background: B,
              borderRadius: 12,
              color: '#fff',
              cursor: 'pointer',
              display: 'inline-flex',
              height: 40,
              justifyContent: 'center',
              listStyle: 'none',
              width: 40,
            }}
          >
            <Menu aria-hidden="true" size={20} />
          </summary>
          <div
            style={{
              background: '#fff',
              border: `1px solid ${BORDER}`,
              borderRadius: 16,
              boxShadow: '0 18px 45px rgba(17,17,17,.12)',
              display: 'grid',
              gap: 18,
              minWidth: 'calc(100vw - 48px)',
              padding: 18,
              position: 'absolute',
              right: 0,
              top: 52,
            }}
          >
            <SearchForm compact />
            <nav style={{ display: 'grid', gap: 12, fontSize: 15 }}>
              {NAV.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  style={{
                    color: B,
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>
            <div
              style={{
                borderTop: `1px solid ${BORDER}`,
                paddingTop: 14,
              }}
            >
              <PhoneLinks compact phones={phones} />
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
