import { ArrowRight } from "lucide-react";
import { B, BG, BORDER, CARD, MUTED, Y } from "../mock/constants";
import { Fade, SectionEyebrow } from "./primitives";

export default function ProcessSection() {
    const steps: [string, string][] = [
        ["Заявка", "Опишите задачу или пришлите макет"],
        ["Согласование", "Уточняем параметры и стоимость"],
        ["Производство", "Запускаем тираж после аванса"],
        ["Контроль", "Проверяем каждое изделие"],
        ["Доставка", "Курьером или ТК с упаковкой"],
    ];
    return (
        <section style={{ background: BG, padding: "88px 0" }}>
            <div className="max-w-screen-xl mx-auto px-6">
                <Fade>
                    <SectionEyebrow n="08" label="процесс" />
                    <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: B, marginBottom: 8, letterSpacing: "-0.02em" }}>
                        Как мы работаем
                    </h2>
                    <p style={{ color: MUTED, marginBottom: 48, lineHeight: 1.6 }}>Пять шагов от заявки до доставки.</p>
                </Fade>
                <div className="grid md:grid-cols-5 gap-4">
                    {steps.map(([title, desc], i) => (
                        <Fade key={title} delay={i * 0.08}>
                            <div
                                style={{
                                    background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24,
                                    position: "relative", transition: "border-color .2s",
                                }}
                            >
                                <div style={{ fontSize: 48, fontWeight: 900, color: Y, lineHeight: 1, marginBottom: 16 }}>{i + 1}</div>
                                <h3 style={{ fontWeight: 700, fontSize: 16, color: B, marginBottom: 8 }}>{title}</h3>
                                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{desc}</p>
                                {i < steps.length - 1 && (
                                    <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center"
                                        style={{ background: BG, borderRadius: "50%", padding: 4 }}>
                                        <ArrowRight style={{ width: 14, height: 14, color: BORDER }} />
                                    </div>
                                )}
                            </div>
                        </Fade>
                    ))}
                </div>
            </div>
        </section>
    );
}