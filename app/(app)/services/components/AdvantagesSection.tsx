import { B, BG, BORDER, CARD, MUTED, Y } from "../mock/constants";
import { advantages } from "../mock/data";
import { Fade, SectionEyebrow } from "./primitives";

export default function AdvantagesSection() {
	return (
		<section style={{ background: BG, padding: "88px 0" }}>
			<div className="max-w-screen-xl mx-auto px-6">
				<Fade>
					<SectionEyebrow n="02" label="преимущества" />
					<h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: B, marginBottom: 8, letterSpacing: "-0.02em" }}>
						Почему выбирают нас
					</h2>
					<p style={{ color: MUTED, marginBottom: 48, maxWidth: 520, lineHeight: 1.6 }}>
						Коммерческие факторы в одном блоке — для закупщиков, маркетологов и дизайнеров.
					</p>
				</Fade>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{advantages.map(([Icon, title, desc]: any, i) => (
						<Fade key={title} delay={i * 0.06}>
							<div
								style={{
									background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16,
									padding: 24, height: "100%", cursor: "default", transition: "border-color .2s",
								}}
							>
								<div
									style={{
										width: 40, height: 40, borderRadius: 12,
										background: "#FFF8CC", display: "flex", alignItems: "center", justifyContent: "center",
										marginBottom: 20, transition: "background .2s",
									}}
								>
									<Icon style={{ width: 20, height: 20, color: B }} />
								</div>
								<h3 style={{ fontWeight: 700, fontSize: 16, color: B, marginBottom: 8 }}>{title}</h3>
								<p style={{ fontSize: 14, color: MUTED, lineHeight: 1.65 }}>{desc}</p>
							</div>
						</Fade>
					))}
				</div>
			</div>
		</section>
	);
}