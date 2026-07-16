import { ArrowRight } from "lucide-react";
import { B, SUBTLE, Y } from "../mock/constants";
import { BtnDark, Fade } from "./primitives";

export default function CTASection() {
    return (
        <section style={{ background: SUBTLE, padding: "88px 0" }}>
            <div className="max-w-screen-xl mx-auto px-6">
                <Fade>
                    <div
                        style={{
                            background: Y, borderRadius: 24, padding: "clamp(40px,6vw,72px)",
                            display: "grid", gap: 32, alignItems: "center",
                        }}
                        className="md:grid-cols-[1fr_auto]"
                    >
                        <div>
                            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: `${B}80`, marginBottom: 16 }}>
                                15 / cta
                            </p>
                            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: B, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                                Получите бесплатный расчёт сегодня
                            </h2>
                            <p style={{ marginTop: 16, color: "#555", fontSize: 17, lineHeight: 1.6 }}>
                                Приложите макет или опишите задачу — технолог ответит по цене, срокам и материалам.
                            </p>
                        </div>
                        <BtnDark href="#contacts">Заказать <ArrowRight className="size-4" /></BtnDark>
                    </div>
                </Fade>
            </div>
        </section>
    );
}