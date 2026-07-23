import { B, BG, BORDER, MUTED, SUBTLE } from '../mock/constants';
import { Card, Fade, SectionEyebrow } from './primitives';

export default function PricingSection() {
  const rows = [
    ['УФ-печать до A3', 'от 25 BYN', '1–2 дня'],
    ['Печать + резка', 'от 50 BYN', '2–4 дня'],
    ['Серийный тираж', 'индивидуально', '3–7 дней'],
    ['Срочная цветопроба', 'от 24 BYN', '24 часа'],
  ];
  return (
    <section id="цены" style={{ background: BG, padding: '88px 0' }}>
      <div className="mx-auto max-w-screen-xl px-6">
        <Fade>
          <SectionEyebrow n="06" label="таблица цен" />
          <h2
            style={{
              fontSize: 'clamp(28px,4vw,42px)',
              fontWeight: 800,
              color: B,
              marginBottom: 8,
              letterSpacing: '-0.02em',
            }}
          >
            Примерные цены и сроки
          </h2>
          <p style={{ color: MUTED, marginBottom: 40, lineHeight: 1.6 }}>
            Тиражные расчёты — через калькулятор выше.
          </p>
        </Fade>
        <Card style={{ overflow: 'hidden' }}>
          <div
            className="grid grid-cols-3"
            style={{
              borderBottom: `1px solid ${BORDER}`,
              padding: '12px 24px',
              background: SUBTLE,
            }}
          >
            {['Услуга', 'Цена', 'Срок'].map((h) => (
              <span
                key={h}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: MUTED,
                }}
              >
                {h}
              </span>
            ))}
          </div>
          {rows.map((r, i) => (
            <div
              key={r[0]}
              className="grid grid-cols-3"
              style={{
                padding: '16px 24px',
                borderBottom: i < rows.length - 1 ? `1px solid ${BORDER}` : 'none',
                transition: 'background .15s',
              }}
            >
              <span style={{ fontWeight: 600, color: B, fontSize: 15 }}>{r[0]}</span>
              <span style={{ color: B, fontSize: 15 }}>{r[1]}</span>
              <span style={{ color: MUTED, fontSize: 15 }}>{r[2]}</span>
            </div>
          ))}
        </Card>
      </div>
    </section>
  );
}
