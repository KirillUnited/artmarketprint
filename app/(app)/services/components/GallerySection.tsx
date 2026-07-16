'use client'

import { useState } from "react";
import { SUBTLE, BORDER, CARD, Y, B, MUTED } from "../mock/constants";
import { Fade, SectionEyebrow } from "./primitives";
import { galleryIds, img } from "../mock/data";

export default function GallerySection() {
    const [filter, setFilter] = useState("Все");
    const filters = ["Все", "Ритейл", "Интерьер", "Сувениры"];
    return (
        <section id="портфолио" style={{ background: SUBTLE, padding: "88px 0" }}>
            <div className="max-w-screen-xl mx-auto px-6">
                <Fade>
                    <SectionEyebrow n="07" label="портфолио" />
                    <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: B, marginBottom: 16, letterSpacing: "-0.02em" }}>
                        Галерея работ
                    </h2>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
                        {filters.map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                style={{
                                    padding: "9px 18px", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer",
                                    border: `1px solid ${filter === f ? Y : BORDER}`,
                                    background: filter === f ? Y : CARD,
                                    color: filter === f ? B : MUTED,
                                    transition: "all .15s",
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </Fade>
                <div className="columns-1 md:columns-3 gap-4">
                    {galleryIds.map((g, i) => (
                        <img
                            key={g}
                            src={img(g, 900, i % 2 ? 1100 : 700)}
                            alt="Пример работы ArtMarketPrint"
                            loading="lazy"
                            style={{ width: "100%", display: "block", marginBottom: 16, breakInside: "avoid", borderRadius: 16, objectFit: "cover" }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}