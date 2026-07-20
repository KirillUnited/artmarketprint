import { MapPin, MessageCircle, Phone } from "lucide-react";
import { B, BG, BORDER, CARD, MUTED, SUBTLE, Y } from "../mock/constants";
import { Fade, SectionEyebrow } from "./primitives";

export default function ContactsSection() {
    const contacts: [React.ElementType, string, string][] = [
        [Phone, "+7 495 123-45-67", "Пн–Пт 09:00–19:00"],
        [MessageCircle, "Telegram / WhatsApp", "Отвечаем за 15 минут"],
        [MapPin, "Москва, ул. Производственная, 12", "Производство и самовывоз"],
    ];
    return (
        <section id="contacts" style={{ background: BG, padding: "88px 0" }}>
            <div className="max-w-screen-xl mx-auto px-6 grid md:grid-cols-2 gap-10">
                <Fade>
                    <div>
                        <SectionEyebrow n="16" label="контакты" />
                        <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: B, marginBottom: 32, letterSpacing: "-0.02em" }}>
                            Связаться с производством
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {contacts.map(([Icon, main, sub]) => (
                                <div
                                    key={main}
                                    style={{
                                        display: "flex", alignItems: "flex-start", gap: 16,
                                        background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 16,
                                        transition: "border-color .2s",
                                    }}
                                >
                                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "#FFF8CC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <Icon style={{ width: 20, height: 20, color: B }} />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 600, color: B, fontSize: 15 }}>{main}</p>
                                        <p style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>{sub}</p>
                                    </div>
                                </div>
                            ))}
                            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 16, fontSize: 13, color: MUTED }}>
                                Оплата по счёту, картой или наличными · ООО «АртМаркетПринт»
                            </div>
                        </div>
                    </div>
                </Fade>
                <Fade delay={0.1}>
                    <div style={{ background: SUBTLE, border: `1px solid ${BORDER}`, borderRadius: 24, padding: 32, display: "flex", flexDirection: "column" }}>
                        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: MUTED, marginBottom: 16 }}>Карта</p>
                        <div
                            style={{
                                flex: 1, minHeight: 280, borderRadius: 16, background: BORDER,
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                        >
                            <p style={{ color: MUTED, fontSize: 15, textAlign: "center" }}>Производство и пункт самовывоза</p>
                        </div>
                    </div>
                </Fade>
            </div>
        </section>
    );
}