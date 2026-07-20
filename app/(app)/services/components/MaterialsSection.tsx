'use client'

import { img, materials } from "../mock/data";
import {SUBTLE, BORDER, CARD, Y, B, MUTED} from "../mock/constants";
import { Fade, SectionEyebrow } from "./primitives";

export default function MaterialsSection() {
    return (
        <section id="материалы" style={{ background: SUBTLE, padding: "88px 0" }}>
            <div className="max-w-screen-xl mx-auto px-6">
                <Fade>
                    <SectionEyebrow n="09" label="материалы" />
                    <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: B, marginBottom: 8, letterSpacing: "-0.02em" }}>
                        Материалы и характеристики
                    </h2>
                    <p style={{ color: MUTED, marginBottom: 48, lineHeight: 1.6 }}>
                        Каждый материал — карточка с фото, описанием и характеристиками из CMS.
                    </p>
                </Fade>
                <div className="grid md:grid-cols-3 gap-4">
                    {materials.map((m, i) => (
                        <Fade key={m.name} delay={i * 0.06}>
                            <div
                                style={{
                                    background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16,
                                    overflow: "hidden", cursor: "default", transition: "border-color .2s",
                                }}
                                onMouseEnter={e => (e.currentTarget.style.borderColor = Y)}
                                onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}
                            >
                                <div style={{ overflow: "hidden", height: 192 }}>
                                    <img
                                        src={img(m.id, 700, 420)} alt={m.name} loading="lazy"
                                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .3s" }}
                                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                                    />
                                </div>
                                <div style={{ padding: 20 }}>
                                    <h3 style={{ fontWeight: 700, fontSize: 16, color: B, marginBottom: 8 }}>{m.name}</h3>
                                    <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.65 }}>{m.desc}</p>
                                </div>
                            </div>
                        </Fade>
                    ))}
                </div>
            </div>
        </section>
    );
}