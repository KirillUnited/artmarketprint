'use client';

import { useMemo, useState } from 'react';
import { B, BORDER, CARD, MUTED, SUBTLE, Y } from '../mock/constants';
import { Fade, SectionEyebrow, Card } from './primitives';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { CURRENCIES_SYMBOLS } from '@/lib/products/companies';
import { BySymbol } from '@/components/ui/symbols/currencies';

export default function CalculatorSection() {
  const [mat, setMat] = useState(1.2);
  const [size, setSize] = useState(1);
  const [qty, setQty] = useState(50);
  const [rush, setRush] = useState(1);
  const [delivery, setDelivery] = useState(900);

  const total = useMemo(
    () => Math.round((2800 * mat * size + qty * 42 * mat) * rush + delivery),
    [mat, size, qty, rush, delivery],
  );

  const selectStyle: React.CSSProperties = {
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    padding: '12px 16px',
    background: CARD,
    color: B,
    fontSize: 15,
    width: '100%',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
  };

  function Sel({
    label,
    value,
    set,
    items,
  }: {
    label: string;
    value: number;
    set: (v: number) => void;
    items: [string, number][];
  }) {
    return (
      <label
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          fontSize: 14,
          fontWeight: 600,
          color: B,
        }}
      >
        {label}
        <select value={value} onChange={(e) => set(Number(e.target.value))} style={selectStyle}>
          {items.map(([l, v]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <section id="calculator" style={{ background: SUBTLE, padding: '88px 0' }}>
      <div className="container max-w-screen-xl">
        <Fade>
          <SectionEyebrow n="05" label="калькулятор" />
          <h2
            style={{
              fontSize: 'clamp(28px,4vw,42px)',
              fontWeight: 800,
              color: B,
              marginBottom: 8,
              letterSpacing: '-0.02em',
            }}
          >
            Расчёт за 30 секунд
          </h2>
          <p style={{ color: MUTED, marginBottom: 48, maxWidth: 520, lineHeight: 1.6 }}>
            Параметры совпадают со структурой CMS — легко подключить справочники из Sanity.
          </p>
        </Fade>
        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <Card style={{ padding: 24 }}>
            <div className="grid gap-5 md:grid-cols-2">
              <Sel
                label="Материал"
                value={mat}
                set={setMat}
                items={[
                  ['ПВХ 3 мм', 1],
                  ['Акрил', 1.35],
                  ['Металл', 1.6],
                ]}
              />
              <Sel
                label="Формат"
                value={size}
                set={setSize}
                items={[
                  ['до A3', 1],
                  ['до A2', 1.45],
                  ['Индивидуальный', 2.1],
                ]}
              />
              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  fontSize: 14,
                  fontWeight: 600,
                  color: B,
                }}
                className="md:col-span-2"
              >
                Количество: <strong>{qty} шт.</strong>
                <input
                  type="range"
                  min="1"
                  max="500"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  style={{ accentColor: Y, height: 6, width: '100%', cursor: 'pointer' }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 12,
                    color: MUTED,
                  }}
                >
                  <span>1 шт.</span>
                  <span>500 шт.</span>
                </div>
              </label>
              <Sel
                label="Срочность"
                value={rush}
                set={setRush}
                items={[
                  ['Стандарт', 1],
                  ['Срочно +35%', 1.35],
                ]}
              />
              <Sel
                label="Доставка"
                value={delivery}
                set={setDelivery}
                items={[
                  ['Самовывоз', 0],
                  ['Курьер', 900],
                  ['ТК по Беларусь', 1600],
                ]}
              />
            </div>
          </Card>
          <Card style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: MUTED,
              }}
            >
              Примерная стоимость
            </p>
            <motion.div
              key={total}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: 16,
                fontSize: 'clamp(36px,5vw,52px)',
                fontWeight: 900,
                color: B,
                lineHeight: 1,
              }}
            >
              {total.toLocaleString('ru-BY', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
                useGrouping: true,
                currency: 'BYN',
              })}{' '}
              {CURRENCIES_SYMBOLS['BYN'] && <BySymbol />}
            </motion.div>
            <p style={{ marginTop: 16, fontSize: 13, color: MUTED, lineHeight: 1.6, flex: 1 }}>
              Стоимость предварительная. Итоговая цена зависит от макета.
            </p>
            <a
              href="#contacts"
              style={{
                marginTop: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: Y,
                color: B,
                fontWeight: 700,
                fontSize: 15,
                borderRadius: 14,
                padding: '14px 20px',
                textDecoration: 'none',
                transition: 'filter .15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(.92)')}
              onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
            >
              Отправить параметры <ArrowRight style={{ width: 16, height: 16 }} />
            </a>
          </Card>
        </div>
      </div>
    </section>
  );
}
