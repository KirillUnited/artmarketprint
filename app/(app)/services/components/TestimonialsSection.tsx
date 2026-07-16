import { Star } from "lucide-react";
import { B, BORDER, CARD, MUTED, SUBTLE, Y } from "../mock/constants";
import { Card, Fade, SectionEyebrow } from "./primitives";

export default function TestimonialsSection() {
    const reviews = [
        { company: "BORK", role: "Бренд-менеджер", text: "Стабильные сроки, аккуратная упаковка и понятная коммуникация по макетам. Давно ищем такого партнёра." },
        { company: "Сколково", role: "Закупщик", text: "Полный цикл от макета до доставки. Бюджет и сроки выдержаны точно. Рекомендуем для корпоративных заказов." },
        { company: "Leroy Merlin", role: "Маркетолог", text: "Оперативно реагируют, дают технические рекомендации до запуска. Брак обменяли за счёт производства." },
    ];
    const clients = ["ALFA", "S7", "РЖД", "VK", "OZON", "МТС", "Газпром", "Сбер"];
    return (
        <section style={{ background: SUBTLE, padding: "88px 0" }}>
            <div className="max-w-screen-xl mx-auto px-6">
                <Fade>
                    <SectionEyebrow n="12–13" label="отзывы и клиенты" />
                    <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: B, marginBottom: 8, letterSpacing: "-0.02em" }}>
                        Нам доверяют
                    </h2>
                    <p style={{ color: MUTED, marginBottom: 48, lineHeight: 1.6 }}>
                        Отзывы с верификацией компании и логотипы клиентов.
                    </p>
                </Fade>
                <div className="grid md:grid-cols-3 gap-4 mb-10">
                    {reviews.map((r, i) => (
                        <Fade key={r.company} delay={i * 0.07}>
                            <Card style={{ padding: 24, height: "100%", display: "flex", flexDirection: "column" }}>
                                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                                    {Array(5).fill(0).map((_, j) => (
                                        <Star key={j} style={{ width: 16, height: 16, fill: Y, color: Y }} />
                                    ))}
                                </div>
                                <p style={{ color: "#555", lineHeight: 1.7, flex: 1 }}>{r.text}</p>
                                <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${BORDER}` }}>
                                    <p style={{ fontWeight: 700, fontSize: 15, color: B }}>{r.company}</p>
                                    <p style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>{r.role}</p>
                                </div>
                            </Card>
                        </Fade>
                    ))}
                </div>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                    {clients.map(c => (
                        <div
                            key={c}
                            style={{
                                background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12,
                                padding: "16px 8px", textAlign: "center",
                                fontSize: 13, fontWeight: 700, color: MUTED,
                                transition: "all .15s", cursor: "default",
                            }}
                        >
                            {c}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}