import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { B, BG, BORDER, CARD, MUTED, SUBTLE, Y } from '../mock/constants';
import { Fade, SectionEyebrow } from './primitives';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries/site.query';
import { sanityFetch } from '@/sanity/lib/sanityFetch';
import { MapFrame } from '@/components/shared/ContactUs';
import Link from 'next/link';
import { Socials } from '@/components/shared/socials';

export default async function ContactsSection() {
  const c = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const contacts = [
    [Phone, c?.siteContactInfo?.phones?.[0].number || '', c?.siteContactInfo?.workingHours || ''],
    [MessageCircle, 'Telegram / WhatsApp', 'Отвечаем за 15 минут'],
    [MapPin, c?.siteContactInfo?.address?.[0].location || '', 'Производство и самовывоз'],
  ];
  if (!contacts) return null;
  console.log('c', c);
  return (
    <section id="contacts" style={{ background: BG, padding: '88px 0' }}>
      <div className="mx-auto grid max-w-screen-xl gap-10 px-6 md:grid-cols-2">
        <Fade>
          <div>
            <SectionEyebrow n="16" label="контакты" />
            <h2
              style={{
                fontSize: 'clamp(28px,4vw,42px)',
                fontWeight: 800,
                color: B,
                marginBottom: 32,
                letterSpacing: '-0.02em',
              }}
            >
              Связаться с производством
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {contacts.map(([Icon, main, sub]) => (
                <div
                  key={main}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16,
                    background: CARD,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 16,
                    padding: 16,
                    transition: 'border-color .2s',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: '#FFF8CC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon style={{ width: 20, height: 20, color: B }} />
                  </div>
                  <div className="flex flex-col gap-2">
                    {Icon === MessageCircle && (
                      <Socials items={c?.siteContactInfo?.socialLinks || []} />
                    )}
                    <div>
                      <Link href={`tel:${main}` || '#'} className="font-semibold">
                        {main}
                      </Link>
                      <p className="text-muted text-sm">{sub}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div
                style={{
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  padding: 16,
                  fontSize: 13,
                  color: MUTED,
                }}
              >
                {c?.siteContactInfo?.footnote || ''}
              </div>
            </div>
          </div>
        </Fade>
        <Fade delay={0.1}>
          <div
            style={{
              background: SUBTLE,
              border: `1px solid ${BORDER}`,
              borderRadius: 24,
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: MUTED,
                marginBottom: 16,
              }}
            >
              Карта
            </p>
            <div
              style={{
                flex: 1,
                minHeight: 280,
                borderRadius: 16,
                background: BORDER,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MapFrame widget={c?.siteContactInfo?.address?.[0].mapEmbed} />
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}
