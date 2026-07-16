import { ArrowRight } from "lucide-react";
import { B, BG, BORDER, CARD, MUTED, Y } from "../mock/constants";
import { products } from "../mock/data";
import { Fade, SectionEyebrow } from "./primitives";

export default function ProductsSection() {
    return (
        <section style={{ background: BG, padding: "88px 0" }}>
            <div className="max-w-screen-xl mx-auto px-6">
                <Fade>
                    <SectionEyebrow n="04" label="каталог" />
                    <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: B, marginBottom: 8, letterSpacing: "-0.02em" }}>
                        Популярные товары
                    </h2>
                    <p style={{ color: MUTED, marginBottom: 40, lineHeight: 1.6 }}>
                        Два ряда — фиксированная высота. Последняя карточка ведёт в каталог.
                    </p>
                </Fade>
                <div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                    style={{ maxHeight: 840, overflow: "hidden" }}
                >
                    {products.map((p, i) => (
                        <Fade key={p.title} delay={i * 0.04}>
                            <div
                                style={{
                                    background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16,
                                    overflow: "hidden", cursor: "pointer", transition: "border-color .2s",
                                }}
                            >
                                <div style={{ overflow: "hidden" }}>
                                    <img
                                        src={p.image} alt={p.title} loading="lazy"
                                        style={{ width: "100%", height: 144, objectFit: "cover", display: "block", transition: "transform .3s" }}
                                       
                                    />
                                </div>
                                <div style={{ padding: 16 }}>
                                    <span style={{ background: "#F4F4F4", color: B, fontSize: 11, fontWeight: 700, borderRadius: 6, padding: "3px 9px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                        {p.tag}
                                    </span>
                                    <h3 style={{ marginTop: 10, fontWeight: 600, fontSize: 14, color: B }}>{p.title}</h3>
                                    <p style={{ marginTop: 4, fontSize: 14, color: MUTED }}>{p.price}</p>
                                </div>
                            </div>
                        </Fade>
                    ))}
                    {/* View all card */}
                    <Fade delay={products.length * 0.04}>
                        <div
                            style={{
                                background: Y, borderRadius: 16, padding: 24, cursor: "pointer",
                                minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "space-between",
                                transition: "filter .15s",
                            }}
                        >
                            <h3 style={{ fontSize: 20, fontWeight: 800, color: B, lineHeight: 1.2 }}>Смотреть весь каталог</h3>
                            <ArrowRight style={{ width: 24, height: 24, color: B }} />
                        </div>
                    </Fade>
                </div>
            </div>
        </section>
    );
}