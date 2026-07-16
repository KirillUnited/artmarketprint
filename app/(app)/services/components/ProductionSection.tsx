import { B, BG, BORDER, MUTED, Y } from "../mock/constants";
import { img } from "../mock/data";
import { Card, Fade, SectionEyebrow } from "./primitives";

export default function ProductionSection() {
    const equipment = ["Mimaki UJF-7151 Plus", "Лазер GCC Mach 9", "Спектрофотометр X-Rite", "Контрольный стол Durst"];
    const stats: [string, string][] = [["12+", "лет опыта"], ["4 000+", "проектов"], ["200+", "клиентов"], ["24 ч", "срочный запуск"]];
    return (
        <section style={{ background: BG, padding: "88px 0" }}>
            <div className="max-w-screen-xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <Fade>
                        <div>
                            <SectionEyebrow n="10–11" label="производство" />
                            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: B, marginBottom: 16, letterSpacing: "-0.02em" }}>
                                Собственное производство и оборудование
                            </h2>
                            <p style={{ color: MUTED, marginBottom: 32, lineHeight: 1.6, maxWidth: 480 }}>
                                Собственный цех, сертифицированные специалисты и контроль качества на каждом этапе — это формирует доверие E-E-A-T.
                            </p>
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {equipment.map(e => (
                                    <Card key={e} style={{ padding: 16, transition: "border-color .2s" }}
                                    >
                                        <p style={{ fontSize: 14, fontWeight: 600, color: B }}>{e}</p>
                                    </Card>
                                ))}
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {stats.map(([n, l]) => (
                                    <div key={l} style={{ textAlign: "center" }}>
                                        <div style={{ fontSize: 28, fontWeight: 900, color: Y }}>{n}</div>
                                        <div style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>{l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Fade>
                    <Fade delay={0.1}>
                        <img
                            src={img("1581092580497-e0d23cbdf1dc", 1000, 900)}
                            alt="Оборудование ArtMarketPrint"
                            loading="lazy"
                            style={{ width: "100%", height: 480, objectFit: "cover", borderRadius: 24, display: "block" }}
                        />
                    </Fade>
                </div>
            </div>
        </section>
    );
}